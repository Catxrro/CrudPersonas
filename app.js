var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articulosdb'
});

conexion.connect(function(err) {
    if (err) {
        console.log('Error al conectar a la base de datos');
        return;
    }
    console.log('Conexión a la base de datos establecida');
});


app.get('/', function(_req, res) {
    res.send('Ruta de Inicio!');
})

// mostrar personas
app.get('/api/persona', (_req, res)=>{
    conexion.query('SELECT * FROM persona', (error, filas)=> {
        if (error) {
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//agregar persona
app.post('/api/persona', (req, res)=>{
    let data = {nombre: req.body.nombre, direccion: req.body.direccion, telefono: req.body.telefono};
    let sql = 'INSERT INTO persona SET ?';
    conexion.query(sql, data, function(error, results){
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    })
});

//modificar persona
app.put('/api/persona/:id', (req, res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let direccion = req.body.direccion;
    let telefono = req.body.telefono;
    let sql = "UPDATE persona SET nombre = '"+nombre+"', direccion = '"+direccion+"', telefono = '"+telefono+"' WHERE id = "+id;
    conexion.query(sql, function(error, results){
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    })
});

//eliminar persona
app.delete('/api/persona/:id', (req, res)=>{
    conexion.query('DELETE FROM persona WHERE id = ?', [req.params.id], function(error, filas){
        if (error) {
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//conectar el servidor
const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function() {
  console.log("Servidor ok en el puerto " + puerto);
});
