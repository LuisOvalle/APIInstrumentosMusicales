var index;
var mongoose = require('mongoose');

var arregloInstrumento =[
  {id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'},
  {id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'}    
]

var camposRequeridos = ['nombre','marca','clasificacion','precio','descripcion'];

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
      status: 400
    };
  }
  return jsonValidacion;
}

const getAll = (req, res, next) =>{
    res.status(200)
    res.json(arregloInstrumento);
}

const getOne = (req, res, next) => {
    const { params } = req
    var instrumento = arregloInstrumento.find(element => element.id == params.id);
    if(instrumento == null) {
        // does not exist
        res.status(404)
        res.json({
          mensaje: "error, el objeto no existe",
          status: 404
        });
    }
    else {
        // does exist
        res.status(200)
        res.json(instrumento);
    }
}

//---------------------CREATE---------------------------------
const create =  (req,res,next) => {
    const { body } = req;
    var jsonValidacion = validarCamposInstruento(body,400)
    console.log("ASDFADFASDFASDFASDFASDFASDF" + jsonValidacion);
    if( (typeof(jsonValidacion)=== 'object')){
      res.status(400)
      res.json(jsonValidacion);
    }else{
        if(arregloInstrumento.length == 0){
            body["id"] = 1;
        }else{
            body["id"] = arregloInstrumento[arregloInstrumento.length-1].id + 1;
        }
        arregloInstrumento.push(body);
        res.status(201)
        res.json({
          mensaje: "Se agrego correctamente el instrumento",
          nombre : body.nombre,
          id : body.id
        })
    }
}

const update = (req, res, next) => {
    index = 0 ;
    const { params } = req;
    const { body } = req;  
    var instrumento = arregloInstrumento.find(element => element.id == params.id);
    if(instrumento == null) {
      // does not exist
      res.status(404)
      res.json({
        mensaje: "error, el objeto no existe",
        status: 404
      });
    }
    var jsonValidacion = validarCamposInstruento(body,400);
    if( (typeof(jsonValidacion)=== 'object') ){
      res.status(400)
      res.json(jsonValidacion);
    }else{
      body["id"] = arregloInstrumento[index].id;
      arregloInstrumento[index] = body;
      res.status(204)
    }
}

const deleteOne =  (req, res, next) => {
    index = 0 ;
    const { params } = req
    var instrumento = arregloInstrumento.find(element => element.id == params.id);
    if(instrumento == null) {
      res.status(404)
      res.json({
        mensaje: "error, el objeto no existe",
        status: 404
      });
    }
    else {
      // does exist
      arregloInstrumento.splice(index,1)
      res.status(204)
      res.json({
        mensaje: "operación completada exitosamente, se elimino el objeto " + params.nombre,
        status: 204
      });
    }   
    
}

module.exports = {
    arregloInstrumento,
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
