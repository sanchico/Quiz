var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req,res) {
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta})
	})
};
//Quiz.findall devuelve el contenido de la base de datos en forma de array
// GET /quizes/answer
exports.answer = function(req,res) {
	models.Quiz.findAll().success(function(quiz) {
		if(req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'La cagaste'});
		}
	})
};

exports.author = function(req,res) {
	res.render('author');
}
