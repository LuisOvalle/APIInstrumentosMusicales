require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const {arregloInstrumento, getAll, getOne, create, update, deleteOne} = require('../../src/instrumentosMusicales/instrumentosMusicales')



describe('User Manager', () => {
  let instrumentosPruebas
  beforeEach(() => {
    instrumentosPruebas = []
    arregloInstrumento.splice(0, arregloInstrumento.length)
  })

  
  it('will get all the musical instruments', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = sandbox.stub()
    const nextMock = sandbox.stub()

    instrumentosPruebas.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    instrumentosPruebas.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const res = {
      status: statusMock,
      json: jsonMock
    }

    getAll(reqMock, res, nextMock)
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, instrumentosPruebas)
  })

  it('will get one musical instruments succesfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 2
        }
    }
    const nextMock = sandbox.stub()

    instrumentosPruebas.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    getOne(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, instrumentosPruebas[0])
  })  

  it('won\'t get one musical instrument because of incorrect id, not in the list', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 10
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    getOne(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no existe",
        "status": 404
    })
  })  
  
//----------------------------CREATE
  it('will insert the first one musical instrument succesfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
                nombre: "Teclado Eléctrico Blanco",
                marca: "Yamaha",
                clasificacion: "de teclado",
                precio: 9900.20,
                descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    create(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 201)
    sinon.assert.calledWith(jsonMock, {
        mensaje: "Se agrego correctamente el instrumento",
        nombre: "Teclado Eléctrico Blanco",
        id: 1
    })
  }) 
  
  it('will insert the second or higher  musical instrument succesfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
                nombre: "Teclado Eléctrico Blanco",
                marca: "Yamaha",
                clasificacion: "de teclado",
                precio: 9900.20,
                descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    create(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 201)
    sinon.assert.calledWith(jsonMock, {
        mensaje: "Se agrego correctamente el instrumento",
        nombre: "Teclado Eléctrico Blanco",
        id: 3
    })
  })

  it('won\'t insert one  musical instrument, missing a key and not the correct number of keys', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
                marca: "Yamaha",
                clasificacion: "de teclado",
                precio: 9900.20,
                descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    create(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.calledWith(jsonMock, {
        mensaje: "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. ",
        status: 400
    })
  })

  it('won\'t insert one  musical instrument, missing a key and not the correct number of keys', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
                marca: "Yamaha",
                clasificacion: "de teclado",
                precio: 9900.20,
                descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    create(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.calledWith(jsonMock, {
        mensaje: "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. ",
        status: 400
    })
  })  

  it('won\'t insert one  musical instrument, the price format is not correct', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
            nombre: "Teclado Eléctrico Blanco",
            marca: "Yamaha",
            clasificacion: "de teclado",
            precio: "precioIncorrecto",
            descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    create(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no es valido. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
        "status": 400
    })
  })

  it('won\'t insert one  musical instrument, the body is empty', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
           
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    create(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. El campo <marca> es obligatorio. El campo <clasificacion> es obligatorio. El campo <precio> es obligatorio. El campo <descripcion> es obligatorio. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
        "status": 400
    })
  })

  //--------------UPDATE------------------------------------------------------

  it('will update a musical instrument succesfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
            id: 1
        },
        body:{
            nombre: "Teclado Eléctrico Blanco",
            marca: "Yamaha",
            clasificacion: "de teclado",
            precio: 9900.20,
            descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    update(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 204)
  })
  
  it('won\'t  update a musical instrument, because it does not exist', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
            id: 10
        },
        body:{
            nombre: "Teclado Eléctrico Blanco",
            marca: "Yamaha",
            clasificacion: "de teclado",
            precio: 9900.20,
            descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    update(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no existe",
        "status": 404
    })
  })

  it('won\'t  update a musical instrument, because it does not have correct price', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
            id: 1
        },
        body:{
            nombre: "Teclado Eléctrico Blanco",
            marca: "Yamaha",
            clasificacion: "de teclado",
            precio: "PRECIO",
            descripcion: "Teclado eléctrico P-45"
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    update(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no es valido. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
        "status": 400
    })
  })

  it('won\'t  update a musical instrument, because body is empty', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
            id: 1
        },
        body:{
            
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    update(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. El campo <marca> es obligatorio. El campo <clasificacion> es obligatorio. El campo <precio> es obligatorio. El campo <descripcion> es obligatorio. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
        "status": 400
    })
  })
  //--------------DELETE------------------------------------------------------

  it('will delete one musical instruments succesfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 2
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    deleteOne(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 204)
  })  

  it('won\'t delete one musical instrument because of incorrect id, not in the list', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 10
        }
    }
    const nextMock = sandbox.stub()

    arregloInstrumento.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    arregloInstrumento.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    deleteOne(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.calledWith(jsonMock, {
        "mensaje": "error, el objeto no existe",
        "status": 404
    })
  })  
})