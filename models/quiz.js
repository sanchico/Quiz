//Definicion del modelo de quiz
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',{
      pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "--> Pregunta no puede estar vacía"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "--> Falta Respuesta"}}
      }
    }
  );
}
