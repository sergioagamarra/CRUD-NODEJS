const ProductModel = require("../models/product")

class Products{

    // Devuleve todos los productos
    async getAll(){
        try {
            const products = await ProductModel.find()
            return products
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getById(idProduct){
        try {
            const product = await ProductModel.findById(idProduct)
            return product
        } catch (error) {
            console.log();
            return error
        }
    }

    // Crea un producto
    async create(data){
        try {
            data.category = this.#toLowerCaseList(data.category)
            const product = await ProductModel.create(data)
            return product
        } catch (error) {
            console.log(error)
            return error
        }
        
    }

    // Actualiza un producto a partir de su id
    async update(idProduct, data){
        try {
            const product = await ProductModel.findByIdAndUpdate(idProduct, data, {new: true})
            return product
        } catch (error) {
            console.log(error)
            return error
        }
    }

    // Elimina un producto a partir de su id
    async delete(idProduct){
        try {
            const product = await ProductModel.findByIdAndDelete(idProduct, {new: true})
            return product
        } catch (error) {
            console.log(error)
            return error
        }
    }

    // Devuelve los productos ordenados por su precio
    async filterByPrice(filter){
        try {
            if (filter.asc === undefined){
                return {
                    message: "Input error"
                }
            }
            if (filter.asc) {
                const products = await ProductModel.find().sort({price: 1})
                return products
            }
            const products = await ProductModel.find().sort({price: -1})
            return products
        } catch (error) {
            console.log()
            return error
        }
    }

    // Devuelve los productos filtrando por categoría
    async filterByCategory(categories){
        try {
            categories.category = this.#toLowerCaseList(categories.category)
            const products = await ProductModel.find({
                category: {
                    $all: categories.category
                }
            })
            if (products[0]) {
                return products
            }
            return {
                message: "There are no products for those categories"
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    // Devuelve los productos filtrando por categoría y ordenado por su precio
    async filterByCategoryAndPrice(filter){
        try {
            if (!filter.category || filter.asc === undefined){
                return {
                    message: "Input error"
                }
            }
            filter.category = this.#toLowerCaseList(filter.category)
            if (filter.asc){
                const products = await ProductModel.find({
                    category: {
                        $all: filter.category
                    }
                }).sort({price: 1})
                return products
            }
            const products = await ProductModel.find({
                category: {
                    $all: filter.category
                }
            }).sort({price: -1})
            if (products[0]) {
                return products
            }
            return {
                message: "There are no products for those categories"
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    // Devuelve los productos filtrando por categoría y un rango de precio
    async filterByCategoryAndRangePrice(filter){
        try {
            if (!filter.category || !filter.minPrice || !filter.maxPrice){
                return {
                    message: "Input error"
                }
            }
            filter.category = this.#toLowerCaseList(filter.category)
                const products = await ProductModel.find({
                    category: {
                        $all: filter.category,
                    },
                    price: {
                        $gte: filter.minPrice, 
                        $lte: filter.maxPrice
                        }
                })
                if (products[0]) {
                    return products
                }
                return {
                    message: "There are no products for these filters"
                }
            
        } catch (error) {
            console.log(error)
            return error
        }
    }
    
    // Convierte mayúsculas a minúsculas
    #toLowerCaseList(category){
        for (let i = 0; i < category.length; i++) {
            category[i] = category[i].toLowerCase()
        }
        return category
    }

}

module.exports = Products