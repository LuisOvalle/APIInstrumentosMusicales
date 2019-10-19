var express = require('express');
var router = express.Router();
//import {InstrumentoMusical, arregloInstrumento} from '../storage/instrumentoMusical';
const {getAll, getOne, create, update, deleteOne} = require('../instrumentosMusicales/instrumentosMusicales')


  /* GET users listing. */
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);

module.exports = router;
