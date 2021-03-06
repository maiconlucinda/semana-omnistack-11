// Importando o Banco de Dados
const connection = require('../database/connection');


module.exports = {

  // Retorna os casos específicos de uma única ONG
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
  }
}