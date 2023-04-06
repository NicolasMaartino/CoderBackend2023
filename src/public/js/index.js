//import fs from 'fs';
//const fs = require("fs")
var socket = io();

socket.on("agregarProducto", datos =>{
    console.log(datos)
    document.body.innerHTML = datos

    

})

socket.on("borrarProducto",datos =>{
    document.body.innerHTML = datos;
})
