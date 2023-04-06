const {Router} = require("express");
let handlebars = require('handlebars');
const path = require("path");
const fs = require('fs')
const productManager = require(path.dirname(__dirname) + "/productManager");

const viewsRouter = Router();

viewsRouter.post("/",async(req,res)=>{
    const { app,body } = req
    const io = app.get('io')
    let {nombreProducto,descripcionProducto,precio,status,categoria,rutaDeImagen,codigoProducto,stock,id} = body;
    let templateProductos = fs.readFileSync(path.dirname(__dirname) + '/views/realTimeProducts.handlebars', 'utf-8');
    //let productos = fs.readFileSync(path.dirname(path.dirname(__dirname)) + '/productos.json', 'utf-8');
    let productos = fs.readFileSync(path.dirname(path.dirname(__dirname)) + '/productos.json', 'utf-8');
    productManager.agregarProducto(nombreProducto,descripcionProducto,precio,status,categoria,rutaDeImagen,codigoProducto,stock);

    
    //console.log("productos",(path.dirname(path.dirname(__dirname)) + '/productos.json'))
    let miTemplate = handlebars.compile(templateProductos);
    //lo renderizo
    let renderizado = miTemplate({"productos":productos});
    // al emit solo le paso la informacion renderizada.. y lo imprime en el HTML
    io.emit("agregarProducto",renderizado)
    /
    res.status(200).send("Se agrego correctamente")
})

viewsRouter.get('/',async(req,res)=>{
    let productos = await productManager.getProductos();

    res.render("home",{productos})

})

viewsRouter.delete('/',async (req,res)=>{
    const {app,body} = req;
    const io = app.get("io");
    let {id} = body;
    productManager.deleteProduct(id);
    
    let templateProductos = fs.readFileSync(path.dirname(__dirname) + '/views/realTimeProducts.handlebars', 'utf-8');
    let  productos = await productManager.getProductosSoloLectura();
    
    let miTemplate = handlebars.compile(templateProductos);
    //lo renderizo
    let renderizado = miTemplate({"productos":productos});
    // al emit solo le paso la informacion renderizada.. y lo imprime en el HTML
    io.emit("borrarProducto",renderizado)
    /
    res.status(200).send("Se agrego correctamente")

})

module.exports = {
    viewsRouter
}