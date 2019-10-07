export class InstrumentoMusical{
    nombre;
    marca;
    clasificacion;
    precio;
    descripcion;

    constructor(){
        this.nombre="";
        this.marca="";
        //this.clasificacion="";
        //this.precio=0;
        this.descripcion="";
    }
}

export var arregloInstrumento =[
    {nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'},
    {nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'}    
]