const http = require("http")
const express = require("express");
const app =  express();


const { productRouter } = require("./routes/products.router");
const { cartRouter } = require("./routes/carts.router");
const { viewsRouter } = require("./routes/views.router");


let server = http.createServer(app);
let {Server} = require("socket.io");
var io = new Server(server)
let handlebars = require('express-handlebars');


app.use(express.urlencoded({extended:true}))

const PORT = 4000;

//instanciando socketServer

const httpServer = server.listen(PORT,()=>{
    console.log("Servidor iniciado en el puerto " + PORT);
})

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.set('io',io)

app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use('/static', express.static('node_modules'));

app.use('/realTimeProducts',viewsRouter);
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);

io.on('connection', (socket) =>{
    console.log("Se conecto al socketServer");
    
    
})








