//Importamos modulo de Mongoose
let mongoose = require("mongoose");
// Crear esquema del usuario
let schema =mongoose.Schema;
//modelamos el esquema
let usuarioSchema = schema({
    nombre: String,
    apellido: String,
    edad: Number,
    correo: String,
    pass: String,
    idRol: String,
    fechaRegistro: {type: Date, default:Date.now},
})
//Módulo
module.exports=mongoose.model("usuario", usuarioSchema);