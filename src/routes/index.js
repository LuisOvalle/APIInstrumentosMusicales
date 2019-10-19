/*var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();
const { indexRoute } = require('../instrumentosMusicales/index')

/* GET home page. */
router.get('/', indexRoute)

module.exports = router;