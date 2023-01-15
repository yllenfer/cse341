const { getCont } = require('../../controllers/contacts');

const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Yllen Fernandez');
});

routes.get('/test', (req, res) => {
    res.send('Georges Janin');
  });

routes.get('/', (req, res) =>{
  //testing contact's info on render
res.send(getCont);
});

module.exports = routes;