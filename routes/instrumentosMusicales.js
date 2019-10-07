var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req,res,next)=> {
  const { body } = req
  res.status(201).json(body)
})

router.put('/:id/permissions/:permissionId', (req, res, next) => {
  const { params } = req
  res.status(200).json(params)
})


router.delete('/:id', (req, res, next) => {
  res.status(204).end()
})

router.get('/hola', (req, res, next) => {
  const response = {
    campo1: "hello",
    campo2: "world"
  }

  res.status(200).json(response)
})

module.exports = router;
