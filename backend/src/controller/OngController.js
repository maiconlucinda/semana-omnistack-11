// Way to create ONGs ID
const crypto = require('crypto');

const generateUniqueId = require('../utils/generateUniqueId');

// Importing the connetion with Database
const connection = require('../database/connection');

module.exports = {

  // Listing all ONGs
  async index (require, response) {
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },


  // Creating ONGs
  async create(request, response) {
    // Pegar os dados que vier no corpo da requisição
    // Bom desestruturar para pegar cada dado separadamente
    const { name, email, whatsapp, city, uf } = request.body;

    // Usando o crypto para criar um número texto aleatório e convertendo para string hexadecimal
    const id = generateUniqueId()

    // Now, through the connection, we can insert datas in the Database 
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    // Quando a ONG se cadastro, devolvo pra ela o ID que será o identificador dela dentro do sistema
    return response.json({ id });
  }


}