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

  it('will insert one musical instruments succesfully', () => {
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
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, {
        mensaje: "Se agrego correctamente el instrumento",
        nombre: "Teclado Eléctrico Blanco",
        id: 1
    })
  })    
  /*
  it('will get the value', () => {
    userList.push({
      name: 'Pablo'
    })
    const response = getValue(0)
    
    expect(response).to.be.deep.equal({
      name: 'Pablo'
    })
  })
  */
})