//Importamos modulo de Mongoose
let mongoose = require("mongoose");
// Crear esquema del usuario
let schema =mongoose.Schema;
//modelamos el esquema
let usuarioSchema = schema({
    nombre: String,
    apellido: String,
    edad: Number,
    documento: String,
    telefono: String,
    correo: String,
    direccion: String,
    pass: String,
    idRol: {type: mongoose.Schema.ObjectId, ref:"rol"},
    fechaRegistro: {type: Date, default:Date.now},
})
//Módulo
module.exports=mongoose.model("usuario", usuarioSchema);