const http = require("http")

const express = require("express");
const { productRouter } = require("./routes/products.router");
const { cartRouter } = require("./routes/carts.router");
const app =  express();
app.use(express.urlencoded({extended:true}))

const PORT = 8080;
app.use(express.json())
app.use(express.static("public"))

app.use("/api/products",productRouter)
app.use("/api/carts",cartRouter)

app.listen(PORT,()=>{
    console.log("Servidor iniciado en el puerto " + PORT)
})

