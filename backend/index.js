//Variables globales de módulos
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
//Varuable para puerto de conexión del servidor
let port = process.env.PORT || 3001;
//Variable de la aplicación
let app = express();
//Routes
let Usuario = require("./routes/usuario");
//Conexión a DB (DataBase)
mongoose.connect("mongodb://localhost:27017/jugostroredb", {useUnifiedTopology: true, useNewUrlParser: true},(err, res)=>{
    if (err) {
        console.log(err);
        throw err;
} else {
    console.log("Servidor DB: ON");
    app.listen(port, function () {
        console.log("Servidor Backend funcionando en el puerto: " + port);
    })
}});
//Analizar las url
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Usar las rutas (API)
app.use("/api", Usuario);
//Creamos módulo para importar
module.exports= app;