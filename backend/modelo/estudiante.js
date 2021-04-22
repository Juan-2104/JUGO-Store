//Importamos modulo de Mongoose
let mongoose = require("mongoose");
// Crear esquema del usuario
let schema =mongoose.Schema;
//modelamos el esquema
letrolSchema = schema({
    nombre: String,
    codigo: String,
    correo: String,
    puntos: Number,
    fechaRegistro: {type: Date, default:Date.now},
})
//Módulo
module.exports=mongoose.model("rol", rolSchema);