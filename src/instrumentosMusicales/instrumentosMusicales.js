var index;

var arregloInstrumento =[
  {id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'},
  {id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'}    
]

var mongoose = require('mongoose');
mongoose.connect('mongodb://immongo:27017/MusicalInstrumentsdatabase');
var InstrumentoMusicalModel = require('../models/instrumentoMusicalModel');
var redis = require('redis');
var conexionRedis = redis.createClient({host : 'imredis', port : 6379});
conexionRedis.on('ready',function() {});

var camposRequeridos = ['nombre','marca','clasificacion','precio','descripcion'];

function borrarValoresPrueba(){
  InstrumentoMusicalModel.collection.drop()
}

function borrarEInsertarValoresPrueba(){
  InstrumentoMusicalModel.collection.drop()
  InstrumentoMusicalModel.insertMany([{id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'},
    {id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'}]);
}

function validarCamposInstruento (instrumento,error){
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

const getAll = async (req, res, next) =>{
  var clave = "getAll"
  conexionRedis.exists(clave, function (err, reply) {
    if(reply === 1){
      conexionRedis.get(clave, function(err,reply){
        jsonRespuesta = JSON.parse(reply)
        res.status(200)
        res.json(jsonRespuesta);
      });
    }else{
      InstrumentoMusicalModel.find({}, {_id:0, __v:0}, function(err, resInstrumentosMusicales) {
        if (!err){
          var cadenaGuardar = JSON.stringify(resInstrumentosMusicales)
          conexionRedis.set(clave, cadenaGuardar);
          conexionRedis.expire(clave, 60);
          res.status(200)
          res.json(resInstrumentosMusicales);
        } 
      });
    }
  });
}

const getOne = async (req, res, next) => {
  const { params } = req
  var clave = 'getOne'+ params.id
  conexionRedis.exists(clave, function (err, reply) {
    if(reply===1){
      conexionRedis.get(clave, function(err,reply){
        jsonRespuesta = JSON.parse(reply)
        res.status(200)
        res.json(jsonRespuesta);
      });
    }else{
      InstrumentoMusicalModel.find({ id: params.id }, {_id:0, __v:0}, function(err, resInstrumentoMusical) {
        if (err){
          // does not exist
          res.status(404)
          res.json({
            mensaje: "error, el objeto no existe",
            status: 404
          });
        }else{
          // does exist
          if(resInstrumentoMusical.length>0){
            conexionRedis.set(clave, JSON.stringify(resInstrumentoMusical))
            conexionRedis.expire(clave, 60);
            res.status(200)
            res.json(resInstrumentoMusical);
          }else{
            res.status(404)
            res.json({
              mensaje: "error, el objeto no existe",
              status: 404
            });
          }
          
        }
      });
    }
  });
}

function saveInDB(body){
  var nuevoInstrumento = InstrumentoMusicalModel({
    id: body.id,
    nombre: body.nombre,
    marca: body.marca,
    clasificacion: body.clasificacion,
    precio: body.precio,
    descripcion: body.descripcion
  });

  // save the user
  nuevoInstrumento.save(function(err) {
    return err;
  });
} 

const create = async (req,res,next) => {
  const { body } = req;
  var jsonValidacion = validarCamposInstruento(body,400)
  if( (typeof(jsonValidacion)=== 'object')){
    res.status(400)
    res.json(jsonValidacion);
  }else{
    try{
      InstrumentoMusicalModel.count({}, function( err, count){
        if(count == 0){
          body["id"] = 1;
          err = saveInDB(body);
        }else{
          InstrumentoMusicalModel.findOne({})
          .sort('-id')  // give me the max
          .exec(function (err, resInstrumentoMusical) {
            body["id"] = resInstrumentoMusical.id + 1;
            err = saveInDB(body);
          });
        }
        if (!err){
          res.status(201)
          res.json({
            mensaje: "Se agrego correctamente el instrumento",
            nombre : body.nombre,
            id : body.id
          })
        } 
      })
    }catch(error){
      res.status(400)
      res.json({});
    }
  }
}

const update = async (req, res, next) => {
  const { params } = req;
  const { body } = req;  
  var jsonValidacion = validarCamposInstruento(body,400);
  if( (typeof(jsonValidacion)=== 'object') ){
    res.status(400)
    res.json(jsonValidacion);
  }else{
    InstrumentoMusicalModel.findOneAndUpdate({ id: params.id }, body, function(err, instrumento) {
      if(!instrumento) {
        // does not exist
        res.status(404)
        res.json({
          mensaje: "error, el objeto no existe",
          status: 404
        });
      } else{
        res.status(204);
        res.json({
          mensaje: "operación completada exitosamente, se modificó" + params.nombre,
          status: 204
        });
      }
    });
  }
}

const deleteOne = async (req, res, next) => {
  const { params } = req
  InstrumentoMusicalModel.findOneAndRemove({ id: params.id }, function(err, item) {
      if (!err){
        // does exist
        if(!item){
          res.status(404)
          res.json({
          mensaje: "error, el objeto no existe",
          status: 404
        });
        }else{
          res.status(204)
          res.json({
            mensaje: "operación completada exitosamente, se elimino el objeto " + params.nombre,
            status: 204
          });
        }
      }else{
        res.status(404)
        res.json({
          mensaje: "error, el objeto no existe",
          status: 404
        });
      }
    });
}

module.exports = {
    arregloInstrumento,
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    borrarEInsertarValoresPrueba,
    borrarValoresPrueba
}
