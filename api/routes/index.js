var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var rolesRouter = require('./roles');
var resourcesRouter = require('./resources');
var employeesRouter = require('./employees');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/resources', resourcesRouter);
router.use('/employees', employeesRouter);

module.exports = router;
