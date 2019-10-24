var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;

var instrumentoMusicalSchema = new mongooseSchema({
    id: Number,
    nombre: String,
    marca: String,
    clasificacion: String,
    precio: Number,
    descripcion: String
  
  //created_at: Date,
  //updated_at: Date
});



var instrumentoMusical = mongoose.model('instrumentoMusical', instrumentoMusicalSchema);
module.exports = instrumentoMusical;