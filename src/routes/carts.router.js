const {Router} = require("express");

const path = require("path");

const productManager = require(path.dirname(__dirname) + "/productManager");

const cartManager = require(path.dirname(__dirname) + "/cartManager");

const cartRouter = Router();

cartRouter.get('/:cid',(req,res)=>{
    let {cid} = req.params;
    productos = cartManager.mostrarProductosDelCarrito(Number(cid));
    if(productos == undefined){
        return res.status(409).send("No existe el carrito que se desea mostrar");
    }else{
        return res.status(200).send(productos)
    }
})

cartRouter.post('/',(req,res)=>{
    cartManager.agregarCarrito();
    res.status(200).send("Se agrego correctamente un carrito nuevo")
})

cartRouter.post('/:cid/product/:pid',async(req,res)=>{
    const {cid,pid} = req.params;
    if ((productManager.cantidadDeProductos() < pid) || (pid <= 0)){
        return res.status(500).send("No hay producto para tal ID")
    }
    let idProducto = productManager.getProducto(Number(pid)).id;
    let respuesta = cartManager.agregarProductoAlCarrito(cid,idProducto,1) // el enunciado indica que de momento se agrega de a un solo producto

    res.status(200).send(await respuesta)
})






module.exports = {
    cartRouter
}