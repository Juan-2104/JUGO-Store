//Variable donde se importa el modulo usuario
let Usuario= require("../modelo/usuario");
//Variable donde encriptamos las pass
let bcrypt = require("bcrypt-nodejs");
const { response } = require("express");
// Funcion para registrar el usuario
const registrarUsuario = (req, res) => {
    // sacamos los parametros del cuerpo de la API (ruta url)
    let params = req.body;
    // utilizamos el modelo usuario
    let usuario = new Usuario();
    // Si llego el password procedemos hacer el hash (encriptar)
    if (params.pass) {
      // Usamos el bcrypt para encriptar la contraseña
      bcrypt.hash(params.pass, null, null, function (err, hash) {
        // si se encripta registramos el usuario
        if (hash) {
          usuario.nombre = params.nombres;
          usuario.apellido = params.apellidos;
          usuario.edad = params.edad;
          usuario.correo = params.correo;
          usuario.pass = hash;
          // Registramos los datos del usuario (los guardamos para enviarlos a mongo por el modelo)
          usuario.save((err, saveUsuario) => {
            if (err) {
              // si hay un error en el registro
              res.status(500).send({ err: "No se registro el usuario" });
            } else {
              // si el proceso se completo bien procedemos a guardar en el modelo los datos
              res.status(200).send({ usuario: saveUsuario });
            }
          });
        }
      });
    } else {
      // Damos respuesta con codigo HTTP de error y enviamos el error a consola
      res.status(405).send({ err: "No se guardo un dato" });
    }
  };
//login
const login = (req, res) =>{
//variable para los parametros que llegan
  let params = req.body;
//Bucamos el usuario en DB
  Usuario.findOne({correo: params.correo}, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({mensaje:"No se pudo registrar el usuario."})
    } else {
      if (datosUsuario) {
        bcrypt.compare(params.pass, datosUsuario.pass, function(err, confirm){
          if (confirm) {
            if (params.getToken) {
              res.status(200).send({Usuario: datosUsuario})
            } else {
            res.status(200).send({Usuario: datosUsuario, mensaje:"Sin Token"});
            }
          } else {
            res.status(401).send({mensaje:"Los datos ingresados no son válidos.Por favor verifique e intente nuevamente."});
          }
        });
      } else {
        res.status(401).send({mensaje:"Los datos ingresados no son válidos.Por favor verifique e intente nuevamente."});
      }
    }
  });
}

//Exportamos el módulo
module.exports = {
    registrarUsuario,
    login,
}