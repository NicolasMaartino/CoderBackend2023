const fs = require("fs");


class ProductManager{
    
    constructor(filename){
        this.path = filename;
        if(fs.existsSync(filename)){
            this.productos = JSON.parse(fs.readFileSync(filename))
        }else{
            this.productos = [];
        }
    }

    async agregarProducto(nombreProducto, descripcionProducto, precio, rutaDeImagen, codigoProducto, stock){
        
        let nuevoProducto = {
            nombreProducto,
            descripcionProducto,
            precio,
            rutaDeImagen,
            codigoProducto,
            stock,
            id: this.productos.length + 1
        }
        this.productos.push(nuevoProducto);
        await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,'\t'))

    }

    async getProductos(){
        return (JSON.parse(await fs.promises.readFile(this.path,'utf-8')));
    }

    getProducto(id){
       
        let valor = this.productos.find(producto => producto.id === id);
        if (valor == undefined){
            throw (new Error());
        } 
        return this.productos.find(producto => producto.id === id);
    }

    async deleteProduct(id){
        let indiceAEliminar;
        for (const indiceProducto in this.productos) {
            if (this.productos[indiceProducto].id == id){
                indiceAEliminar = indiceProducto;
                break;
            }
        }
        
        this.productos.splice(indiceAEliminar,indiceAEliminar+1);

        await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,'\t'))
    }

    async updateProduct(id,campoActualizar, nuevoDato){
        
        let productoEncontrando = this.productos.find(producto => producto.id === id);


        Object.defineProperty(productoEncontrando,campoActualizar,{value:nuevoDato});


        await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,'\t'))
    }

    cantidadDeProductos(){
        return this.productos.length
    }
}

module.exports = new ProductManager("productos.json")