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

instrumentoMusicalSchema.methods.dudify = function() {
    // add some stuff to the users name
    this.name = this.name + '-dude'; 
  
    return this.name;
  };

var instrumentoMusical = mongoose.model('instrumentoMusical', instrumentoMusicalSchema);
module.exports = instrumentoMusical;