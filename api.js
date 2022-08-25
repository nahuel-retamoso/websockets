class ProductosApi {
    constructor() {
        this.productos = []
        this.id = 0
    }

    listar(id) {
        const productId = this.productos.find(product => product.id === parseInt(id))
        return productId
    }

    listarAll() {
        return this.productos
    }

    guardar(prod) {
        this.id += 1
        const newProduct = {
            id: this.id,
            nombre: prod.nombre,
            precio: prod.precio,
            url: prod.imagenURL
        }
        this.productos.push(newProduct)
        return newProduct

    }

    actualizar(prod, id) {
        const newProduct = {
            id: parseInt(id),
            nombre: prod.nombre,
            precio: prod.precio,
            url: prod.imagenURL
        }
        this.borrar(id)
        this.productos.push(newProduct)
    }

    borrar(id) {
        const productId = this.productos.find(product => product.id === parseInt(id))
        this.productos.splice(this.productos.indexOf(productId), 1)
        
    }
}

module.exports = ProductosApi;