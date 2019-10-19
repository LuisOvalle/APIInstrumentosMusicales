const indexRoute = (req, res, next) => {
    res.status(200)
    res.json({
      hola: 'mundo'
    })
  }
  
  module.exports = {
    indexRoute
  }