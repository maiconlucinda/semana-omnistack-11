// Importing the express to this module
const express = require('express');

// Importing the 'celebrate' using destructuring.
const { celebrate, Segments, Joi } = require('celebrate');


// Importing the OngController 
const OngController = require('./controller/OngController');

// Importing the IncidentController
const IncidentController = require('./controller/IncidentController');

// Importando the ProfileController
const ProfileController = require('./controller/ProfileControlle');

// Importando the SessionController
const SessionController = require('./controller/SessionController');


// Instanciando a parte de rotas de dentro do express
const routes = express.Router();


// Route para login ('post' => Pois estamos criando uma sessão no Banco de Dados)
routes.post('/session', SessionController.create);


/**
* Query params: vem depois de "?" na URL, geralmente usado para paginação
* Route params: Vem depois de "/" na URL, usando para acessar o caminho
* Request Body: Vem no corpo da requisição
*/


// Route to get all ONG saved
routes.get('/ongs', OngController.index);

// Route to add a new ONG
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);


// Route to show all incidents of one ONG
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);


// Route do get all Incidents saved
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

// Rota para adicionar um incidente para alguma ONG
routes.post('/incidents', IncidentController.create);

// Rota para remover um incidente 
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);


module.exports = routes;