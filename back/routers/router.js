let express = require('express');
let router = express.Router();
 
const users = require('../controllers/demandeController.js');

router.post('/api/users/create', users.create);
router.get('/api/users/retrieveinfos', users.retrieveAllUsers);
router.put('/api/users/updatebyid/:id', users.updateById);
router.delete('/api/users/deletebyid/:id', users.deleteById);

const cotisations = require('../controllers/demandeController.js');

router.post('/api/cotisations/create', cotisations.create);
router.get('/api/cotisations/retrieveinfos', cotisations.retrieveAllCotisations);
router.put('/api/cotisations/updatebyid/:id', cotisations.updateById);
router.delete('/api/cotisations/deletebyid/:id', cotisations.deleteById);

const demandes = require('../controllers/demandeController.js');

router.post('/api/demandes/create', demandes.create);
router.get('/api/demandes/retrieveinfos', demandes.retrieveAllDemandes);
router.put('/api/demandes/updatebyid/:id', demandes.updateById);
router.delete('/api/demandes/deletebyid/:id', demandes.deleteById);

module.exports = router;



