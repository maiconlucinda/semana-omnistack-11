// Importing the connetion with Database
const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')

      // Para que o retorno não seja um array
      .first();

      // Caso a ONG não exista, retornarei um erro
      if (!ong) {
        return response.status(400).json({ error: 'No ONG found with this ID' })
      }

    // Retornando os dados da ONG, o nome da ONG no caso
    return response.json(ong);
  }
}