const {Router} = require("express");
const path = require("path");
const productManager = require(path.dirname(__dirname) + "/productManager");

const viewsRouter = Router();

viewsRouter.post("/",(req,res)=>{
    const { app,body } = req
    const io = app.get('io')
    let producto = body;
    io.emit("resolucion",producto)
    res.status(200).send("Se agrego correctamente")
})

viewsRouter.get('/',async(req,res)=>{
    let productos = await productManager.getProductos();
    res.render("home",{productos})

})


module.exports = {
    viewsRouter
}