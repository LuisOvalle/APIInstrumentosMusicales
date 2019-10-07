var express = require('express');
var router = express.Router();
//import {InstrumentoMusical, arregloInstrumento} from '../storage/instrumentoMusical';

var mensaje = '';

var arregloInstrumento =[
  {nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'},
  {nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'}    
]

  /* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    CantidaInstrumentos: arregloInstrumento.length, 
    Listado: arregloInstrumento
  });
});

router.get('/:id', function(req, res, next) {
  const { params } = req
  
  if(typeof arregloInstrumento[params.id] === 'undefined') {
      // does not exist
      res.status(404).json({
        mensaje: "error, el objeto no exite",
        status: 404
      });
  }
  else {
      // does exist
      res.status(200).json(arregloInstrumento[params.id]);
  }
});

router.post('/', (req,res,next)=> {
  const { body } = req
  try{
    arregloInstrumento.unshift(body);
    res.status(201).json(body)
  }
  catch{
    res.status(400).json({
      mensaje: "error, el objeto no es valido",
      status: 400
    });
  }
})

router.put('/:id/permissions/:permissionId', (req, res, next) => {
  const { params } = req
  res.status(200).json(params)
})


router.delete('/:id', (req, res, next) => {
  const { params } = req
  if(typeof arregloInstrumento[params.id] === 'undefined') {
    arregloInstrumento.splice(params,1)
    res.status(204).json();
  }
  else {
    // does exist
    res.status(200).json(arregloInstrumento[params.id]);
  }   
})


module.exports = router;
