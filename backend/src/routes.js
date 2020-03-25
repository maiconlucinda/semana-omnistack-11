// Importing the express to this module
const express = require('express');

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


// Route to get all ONG saved
routes.get('/ongs', OngController.index);

// Route to add a new ONG
routes.post('/ongs', OngController.create);


// Route to show all incidents of one ONG
routes.get('/profile', ProfileController.index);


// Route do get all Incidents saved
routes.get('/incidents', IncidentController.index);

// Rota para adicionar um incidente para alguma ONG
routes.post('/incidents', IncidentController.create);

// Rota para remover um incidente 
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;