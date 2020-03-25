// Importando o Banco de Dados
const connection = require('../database/connection');

module.exports = {
  // Listing all incidents
  async index(request, response) {
    // Senão vier nada relativo a paginação, vem a página 1
    const { page = 1} = request.query; 

    // Pegar a quantidade total de incidents (pode ser que retorne um array, usando os [] estou dizendo pra vir só o primeiro)
    const [count] = await connection('incidents').count();

    // Lógica para pegar 5 casos por vez (paginação)
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*',
      'ongs.name', 
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ]);

    // Resposta do total de itens que temos na lista
    response.header('X-Total-Count', count['count(*)'])

    // Retornando os incidentes
    return response.json(incidents);
  },


  async create(request, response) {
    const { title, description, value } = request.body;

    // Geralmente as informações de login não vem pelo body da requisição, em geral vem pelo cabeçalho da requisição
    // Forma de acessar o cabeçalho (informações do contexto da requisição)...
    const ong_id = request.headers.authorization


    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id }); 
  },


  async delete(request, response) {
    
    // Pego o ID do incidente que será excluído pelos parâmetros da request
    const { id } = request.params;

    // Pego o ID da ONG que está logada no sistema 
    const ong_id = request.headers.authorization;

    // Encontrar um incidente específico para ser excluído
    const incident = await connection('incidents')

    // Busco um incidente onde o 'id' que veio no request seja igual ao ID que tenho no Banco de dados
    .where('id', id)

    // Seleciono apenas a coluna 'ong_id'.
    .select('ong_id')

    // O retorno será apenas um registro pois só terá uma ONG com o ID selecionado
    .first(); // Irá me retornar somente o único resultado 

    // Validando se o ong_id da ONG que pegamos do Banco de Dados é diferente do ong_id da ONG que está logado fazendo a exclusão 
    if (incident.ong_id !== ong_id) {

      // Retorno como 'Não autorizado'
      return response.status(401).json({ error: 'Operation not permitted. '});
    } 

    // Busco um incidente onde o 'id' que veio no request seja igual ao ID que tenho no Banco de dados e deleto ele
    await connection('incidents').where('id', id).delete();

    // Retorno o status 204 (deu sucesso porém não tem conteúdo para retornar).send(retorna a resposta sem corpo)
    return response.status(204).send()

  }

}