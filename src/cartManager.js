const fs = require("fs");

class CartManager{

    constructor(filename){
        this.path = filename;
        if(fs.existsSync(filename)){
            this.carritos = JSON.parse(fs.readFileSync(filename))
        }else{
            this.carritos = [];
        }
    }

    // products sera un array que dentro llevara un objeto del tipo {idProducto,cantidad}
    async agregarCarrito(){
        let nuevoCarrito = {
            id:this.carritos.length + 1,
            products:[]
        }
        this.carritos.push(nuevoCarrito);

        await fs.promises.writeFile(this.path,JSON.stringify(this.carritos,null,'\t'))
    }

    mostrarCarritos(){
        return this.carritos;
    }

    mostrarCarritoPorId(id){
        return this.carritos.find(carrito => carrito.id == id);
    }

    mostrarProductosDelCarrito(id){
        if(this.carritos.length < id){
            return undefined;
        }
        return this.carritos.find(carrito => carrito.id == id).products;
    }

    async agregarProductoAlCarrito(idCarrito,idProducto,cantidad){
        let carrito = this.carritos.find(carrito => carrito.id == idCarrito);

        if(carrito == undefined){
            return "No hay carrito que corresponda al ID";
        }
        else{

            let bool = false;
            let i = 0;
            let iEncontrado ;
            for (const producto in carrito.products) {
                if (carrito.products[producto].id == idProducto){
                    bool = true;
                    iEncontrado = i;
                }
                i++;
            }
            if (bool){
                // esto significa que el ID del producto ya existe en el carrito.. le sumamos la cantidad correspondiente entonces, asi no repite
                this.carritos.find(carrito => carrito.id == idCarrito).products[iEncontrado].cantidad += cantidad;
            }else{//sino lo pusheamos para que exista
                this.carritos.find(carrito => carrito.id == idCarrito).products.push({"id":idProducto,"cantidad":cantidad});
            }
        }
            await fs.promises.writeFile(this.path,JSON.stringify(this.carritos,null,'\t'));
            console.log("llego")
            return "Transaccion completada"
        }
    }

module.exports = new CartManager("carritos.json");