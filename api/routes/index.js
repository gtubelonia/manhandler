var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var rolesRouter = require('./roles')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('//roles', rolesRouter);

module.exports = router;
