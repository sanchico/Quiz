var express = require('express');
//importar quiz_controller.js
var router = express.Router();
var quizController = require ('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Definición de rutas de /quizes. \\d+ = uno o mas numeros decimales
router.get('/quizes',                          quizController.index);
router.get('/quizes/:quizId(\\d+)',           quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',    quizController.answer);

router.get('/author', quizController.author);

module.exports = router;
