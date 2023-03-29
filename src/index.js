const http = require("http")

const express = require("express");
const { productRouter } = require("./routes/products.router");
const { cartRouter } = require("./routes/carts.router");
const { viewsRouter } = require("./routes/views.router");
const {Server} = require("socket.io");
const handlebars = require('express-handlebars');



const app =  express();
app.use(express.urlencoded({extended:true}))

const PORT = 4000;

//instanciando socketServer

const httpServer = app.listen(PORT,()=>{
    console.log("Servidor iniciado en el puerto " + PORT)
})

const socketServer = new Server(httpServer);





app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json())
app.use(express.static(__dirname+"/public"))

app.use('/',viewsRouter)
app.use("/api/products",productRouter)
app.use("/api/carts",cartRouter)


socketServer.on('connection', socket=>{
    console.log("Se conecto al socketServer");
})



