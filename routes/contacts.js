const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getCont);

router.get('/:id', contactsController.getSingleCont);

router.delete('/:id', contactsController.deleteCont);

router.put('/:id', contactsController.updateCont);

router.post('/', contactsController.createCont);

module.exports = router;