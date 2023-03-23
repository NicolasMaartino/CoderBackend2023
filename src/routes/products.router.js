const {Router} = require("express");

const path = require("path");

const productManager = require(path.dirname(__dirname) + "/productManager");


//let productos = async (a,b)=>{await productManager.getProductos()}

//console.log(productos)
const productRouter = Router();


productRouter.get('/',async(req,res)=>{
    const {limit} = req.query;

    if(!limit || limit > productManager.cantidadDeProductos()){
        return res.send(await productManager.getProductos())
    }
    else {
        let productosLimite = [];
        for (let i = 0; i < limit; i++) {
           productosLimite.push(productManager.getProducto(i+1))
        }
        res.send(productosLimite)
    }

})

productRouter.get('/:pid',async(req,res)=>{
    let {pid} = req.params;
    if(pid <= productManager.cantidadDeProductos() ){
        res.status(200).send(productManager.getProducto(Number(pid)))
    }else{
        res.send("No existe un producto para ese ID")
    }
})

productRouter.put("/:pid",async(req,res)=>{
    let {pid} = req.params;
    let campos = req.body;
   
    for (const campo in campos) {
        if(productManager.updateProduct(Number(pid),campo,campos[campo])){
            return res.status(409).send("No existe el producto que se desea actualizar");
        }
    }
    res.status(200).send("OK")
})

productRouter.delete("/:pid",async(req,res)=>{
    let {pid} = req.params;
    if(productManager.deleteProduct(pid)){
        return res.status(409).send("No existe el producto que se desea eliminar");
    }else{
        return res.status(200).send("Se elimina producto, correctamente")
    }
    

})

productRouter.post("/",async (req,res)=>{
    let {nombreProducto,descripcionProducto,precio,status=true,categoria,rutaDeImagen,codigoProducto,stock} = req.body;
    
    
    if ( (nombreProducto == null) || (descripcionProducto == null) || (codigoProducto == null) || (precio == null) || (stock == null) || (categoria == null)){
        
        
        res.status(400).send({status:"error",error:"Por favor, ingresar bien los datos"});
        
    }else{
        productManager.agregarProducto(
            nombreProducto,
            descripcionProducto,
            precio,
            status,
            categoria,
            rutaDeImagen,
            codigoProducto,
            stock
        );
        res.status(200).send("Se agrego correctamente")
    }
})



module.exports = {
    productRouter
}