const express = require('express');
const router = express.Router();

const tradeController = require('../controllers/trades');

router.post('/', tradeController.create);

router.get('/', tradeController.getAll);

router.get('/:id', tradeController.getById);

router.patch('/:id', tradeController.partialUpdate);

router.put('/:id', tradeController.update);

router.delete('/:id', tradeController.delete);

module.exports = router;