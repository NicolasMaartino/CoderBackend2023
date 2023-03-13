const http = require("http")
const productManager = require("./productManager");
productManager.getProductos().then(data=> data)
const express = require("express");
const app =  express();

const PORT = 5500;

app.get("/products",async(req,resp)=>{
    const {limit} = req.query;

    if(!limit || limit > productManager.cantidadDeProductos()){
        return resp.send(await productManager.getProductos())
    }
    else {
        let productosLimite = [];
        for (let i = 0; i < limit; i++) {
           productosLimite.push(productManager.getProducto(i+1))
        }
        resp.send(productosLimite)
    }
})

app.get("/products/:pid",(req,resp)=>{
    let {pid} = req.params;
    console.log("ID seleccionado: " + Number(pid))
    console.log("Cantidad de productos: " + productManager.cantidadDeProductos())
    if(pid <= productManager.cantidadDeProductos()){
        
        resp.send(productManager.getProducto(Number(pid)))
    }else{
        resp.send("No existe un producto para ese ID")
    }})

app.listen(PORT,()=>{
    console.log("Servidor iniciado en el puerto " + PORT)
})

