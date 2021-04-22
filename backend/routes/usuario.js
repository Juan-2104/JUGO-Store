//variable express
let express = require("express");
//importamos el controlador de usuario
let Usuario = require("../controllers/usuario");

//Creamos la API
let api = express.Router();

//servicio POST(registrar) http://localhost:3001/api/registrarUsuario
api.post("/registrarUsuario", Usuario.registrarUsuario);
// Servicio para el login
api.post("/login", Usuario.login);
//exportamos el módulo
module.exports = api;