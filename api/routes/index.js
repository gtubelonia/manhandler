var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var rolesRouter = require('./roles');
var resourcesRouter = require('./resources');
var employeesRouter = require('./employees');
var positionsRouter = require('./positions');
var departmentsRouter = require('./departments');
var teamsRouter = require('./teams');
var phonesRouter = require('./phones');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/resources', resourcesRouter);
router.use('/employees', employeesRouter);
router.use('/positions', positionsRouter);
router.use('/departments', departmentsRouter);
router.use('/teams', teamsRouter);
router.use('/phones', phonesRouter);

module.exports = router;
