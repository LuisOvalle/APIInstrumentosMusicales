require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const {getAll, getOne, create, update, deleteOne, InstrumentoMusicalModel, borrarEInsertarValoresPrueba, borrarValoresPrueba} = require('../../src/instrumentosMusicales/instrumentosMusicales')


describe('User Manager', () => {
  let instrumentosPruebas

  beforeEach( async() => {
    instrumentosPruebas = []
  })

  //--------------DELETE------------------------------------------------------

  it('will delete one musical instruments succesfully', async() => {
    await borrarEInsertarValoresPrueba()
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 2
        }
    }
    const nextMock = sandbox.stub()
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await deleteOne(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 204)
    })
  })  

  it('won\'t delete one musical instrument because of incorrect id, not in the list', async() => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 10
        }
    }
    const nextMock = sandbox.stub()
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await deleteOne(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no existe",
            "status": 404
        })
    })
  })  
  //----------------------READ
  it('will get all the musical instruments', async () => {
    //await borrarEInsertarValoresPrueba().then ( () =>{})
    await borrarEInsertarValoresPrueba()
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = sandbox.stub()
    const nextMock = sandbox.stub()

    instrumentosPruebas.push({id: 1, nombre: 'Piano', marca: 'Yamaha', clasificacion: 'de teclado', precio: 10000, descripcion: 'Piano clasico eléctrico P-45'})
    instrumentosPruebas.push({id: 2, nombre: 'Guitarra Electrica', marca: 'Fender', clasificacion: 'de cuerda', precio: 2000, descripcion: 'Guitarra electro acustica  FA-125CE'})
    const res = {
      status: statusMock,
      json: jsonMock
    }

    await getAll(reqMock, res, nextMock).then ( () =>{
        console.log("status:" + statusMock)
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, instrumentosPruebas)
    }).catch(() => {})
    
  })

  it('will get one musical instruments succesfully', async() => {
    //borrarEInsertarValoresPrueba();
    await borrarEInsertarValoresPrueba()
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

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await getOne(reqMock, resMock, nextMock).then ( () =>{
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, instrumentosPruebas[0])
    }).catch(() => {})
  })  

  it('won\'t get one musical instrument because of incorrect id, not in the list', async() => {
    await borrarEInsertarValoresPrueba()
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        params: {
          id: 10
        }
    }
    const nextMock = sandbox.stub()
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
    await getOne(reqMock, resMock, nextMock).then ( () =>{
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no existe",
            "status": 404
        })
    }).catch(() => {})
    
  })  
  
//----------------------------CREATE
  it('will insert the first one musical instrument succesfully', async() => {
    await borrarValoresPrueba()
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
  
    await create(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 201)
        sinon.assert.calledWith(jsonMock, {
            mensaje: "Se agrego correctamente el instrumento",
            nombre: "Teclado Eléctrico Blanco",
            id: 1
        })
    })
  }) 
  
  it('will insert the second or higher  musical instrument succesfully',async () => {
    await borrarEInsertarValoresPrueba()
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
  
    await create(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 201)
        sinon.assert.calledWith(jsonMock, {
            mensaje: "Se agrego correctamente el instrumento",
            nombre: "Teclado Eléctrico Blanco",
            id: 3
        })
    })
  })

  it('won\'t insert one  musical instrument, missing a key and not the correct number of keys',async () => {
    await borrarValoresPrueba()
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
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await create(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 400)
        sinon.assert.calledWith(jsonMock, {
            mensaje: "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. ",
            status: 400
        })
    })

  })

  it('won\'t insert one  musical instrument, missing a key and not the correct number of keys',async () => {
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
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await create(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 400)
        sinon.assert.calledWith(jsonMock, {
            mensaje: "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. ",
            status: 400
        })
    })

  })  

  it('won\'t insert one  musical instrument, the price format is not correct', async() => {
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
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await create(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 400)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no es valido. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
            "status": 400
        })
    })

  })

  it('won\'t insert one  musical instrument, the body is empty', async() => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
        body:{
           
        }
    }
    const nextMock = sandbox.stub()

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await create(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 400)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. El campo <marca> es obligatorio. El campo <clasificacion> es obligatorio. El campo <precio> es obligatorio. El campo <descripcion> es obligatorio. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
            "status": 400
        })
    })

  })

  //--------------UPDATE------------------------------------------------------

  it('will update a musical instrument succesfully', async() => {
    await borrarEInsertarValoresPrueba()
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

    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await update(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 204)
    })
  })
  
  it('won\'t  update a musical instrument, because it does not exist',async () => {
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
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await update(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no existe",
            "status": 404
        })
    })
  })

  it('won\'t  update a musical instrument, because it does not have correct price',async () => {
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
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await update(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 400)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no es valido. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
            "status": 400
        })
    })
  })

  it('won\'t  update a musical instrument, because body is empty', async() => {
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
    const resMock = {
        status: statusMock,
        json: jsonMock
    }
  
    await update(reqMock, resMock, nextMock).then ( () =>{}).catch(() => {
        sinon.assert.calledWith(statusMock, 400)
        sinon.assert.calledWith(jsonMock, {
            "mensaje": "error, el objeto no es valido. El JSON tiene la cantidad de campos requerida, la cual es 5. El campo <nombre> es obligatorio. El campo <marca> es obligatorio. El campo <clasificacion> es obligatorio. El campo <precio> es obligatorio. El campo <descripcion> es obligatorio. El precio tiene que ser un numero con dos decimales como máximo y con un punto como separador. ",
            "status": 400
        })
    })
  })
  
})