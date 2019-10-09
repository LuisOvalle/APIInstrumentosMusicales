var express = require('express');
var router = express.Router();
//import {InstrumentoMusical, arregloInstrumento} from '../storage/instrumentoMusical';

var index;

var arregloInstrumento =[
  {id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'},
  {id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'}    
]

var camposRequeridos = ['nombre','marca','clasificacion','precio','descripcion'];

function busacarInstrumento(id){
  var instrumento;
  for (let i = 0; i < arregloInstrumento.length; i++) {
    if(id == arregloInstrumento[i].id) {
      instrumento = arregloInstrumento[i];
      index = i;
      break; 
    }
  }
  return instrumento;
}

function validarCamposInstruento(instrumento,error){
  var error= false;
  var mensaje="";
  var jsonValidacion;
  var patron =  /[0-9]+\.?[0-9]{0,2}/;
  if(!( +Object.keys(instrumento).length == 5)){
    error = true;
    mensaje = mensaje + "El JSON tiene la cantidad de campos requerida, la cual es 5. ";
  }
  for (let i = 0; i < camposRequeridos.length; i++) {
    if(!instrumento[camposRequeridos[i]]){
      error = true;
      mensaje = mensaje + 'El campo <' + camposRequeridos[i] + '> es obligatorio. ';
    }
  }
  if(patron.test(instrumento.precio) == false){
    error = true;
    mensaje = mensaje + "El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ";
  }
  if(error){
    jsonValidacion={
      mensaje: "error, el objeto no es valido. " + mensaje,
      status: error
    };
  }
  return jsonValidacion;
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}


  /* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    CantidaInstrumentos: arregloInstrumento.length, 
    Listado: arregloInstrumento
  });
});

router.get('/:id', function(req, res, next) {
    const { params } = req
    var instrumento = busacarInstrumento(params.id);
    if(isEmpty(instrumento)) {
        // does not exist
        res.status(404).json({
          mensaje: "error, el objeto no existe",
          status: 404
        });
    }
    else {
        // does exist
        res.status(200).json(instrumento);
    }
});

router.post('/', (req,res,next)=> {
  const { body } = req;
  var jsonValidacion = validarCamposInstruento(body,400);
  if( !isEmpty(jsonValidacion)){
    res.status(400).json(jsonValidacion);
  }else{
    //try{
      body["id"] = arregloInstrumento[arregloInstrumento.length-1].id + 1;
      arregloInstrumento.push(body);
      res.status(201).json({
        mensaje: "Se agrego correctamente el instrumento",
        nombre : body.nombre,
        id : body.id
      })
    /*}
    catch{
      res.status(400).json({
        mensaje: "error, el objeto no es valido",
        status: 400
      });
    }*/
  }
})

router.put('/:id', (req, res, next) => {
  index = 0 ;
  const { params } = req;
  const { body } = req;  
  var instrumento = busacarInstrumento(params.id);
  if(isEmpty(instrumento)) {
    // does not exist
    res.status(404).json({
      mensaje: "error, el objeto no existe",
      status: 404
    });
  }
  var jsonValidacion = validarCamposInstruento(body,400);
  if( !isEmpty(jsonValidacion)){
    res.status(400).json(jsonValidacion);
  }else{
    body["id"] = arregloInstrumento[index].id;
    arregloInstrumento[index] = body;
    res.status(204).json(body)
  }
})

router.delete('/:id', (req, res, next) => {
  index = 0 ;
  const { params } = req
  var instrumento = busacarInstrumento(params.id);
  if(isEmpty(instrumento)) {
    res.status(404).json({
      mensaje: "error, el objeto no existe",
      status: 404
    });
  }
  else {
    // does exist
    arregloInstrumento.splice(index,1)
    res.status(204).json({
      mensaje: "operación completada exitosamente, se elimino el objeto " + params.nombre,
      status: 204
    });
  }   
})

module.exports = router;
