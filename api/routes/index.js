var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var rolesRouter = require('./roles');
var resourcesRouter = require('./resources');
var employeesRouter = require('./employees');
var positionsRouter = require('./positions');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/resources', resourcesRouter);
router.use('/employees', employeesRouter);
router.use('/positions', positionsRouter);

module.exports = router;
