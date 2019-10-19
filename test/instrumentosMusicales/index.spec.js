require('mocha')
const sinon = require('sinon')
// const { expect } = require('chai')
const { indexRoute } = require('../../src/managers/index')

describe('Index Manager', () => {
  it('will get the index route response', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = sandbox.stub()
    const nextMock = sandbox.stub()

    const res = {
      status: statusMock,
      json: jsonMock
    }

    indexRoute(reqMock, res, nextMock)
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, {
      hola: 'mundo'
    })
  })
})