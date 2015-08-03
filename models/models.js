var path = require('path');

//Postgres DATABASE_URL = postgres://user:password@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require ('sequelize');

// Usar BBDD SQLite O Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  //solo SQLite (.env)
    omitNull: true      //solo Postgres
  }
);
// Importar la definición
/*El método join crea la URL uniendo la ruta de éste archivo = __dirname
con el archivo quiz.js. El método import transfiere el modelo almacenado en el
archivo quiz.js a la variable Quiz*/
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
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
