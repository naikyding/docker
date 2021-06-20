var express = require('express');
var router = express.Router();
const db = require('../mysql')

/* GET home page. */
router.get('/', function (req, res, next) {
  db.query('SELECT * FROM `todo`', (err, result) => {
    res.render('index', { title: 'EXPRESS + MYSQL w/ docker-compose', data: result || 'NODATA...' });
  })
});

module.exports = router;
