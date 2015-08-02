var path = require('path');

//Cargar Modelo ORM

var Sequelize = require ('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
                      {dialect: "sqlite", storage: "quiz.sqlite"}
                    );
// Importar la definición
/*El método join crea la URL uniendo la ruta de éste archivo = __dirname
con el archivo quiz.js. El método import transfiere el modelo almacenado en el
archivo quiz.js a la variable Quiz*/
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
//exportar definición de tabla Quiz para que se pueda usar en otras partes
exports.Quiz = Quiz;
//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
  // success() ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){
    if(count === 0) { //la tabla se inicializa sólo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                  })
      .success(function(){console.log('Base de datos inicializada')});
    };
  });
});
