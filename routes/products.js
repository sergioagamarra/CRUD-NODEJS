const express = require("express")
const ProductsService = require("../services/products")
const { json } = require("express")

function products(app){
    const router = express.Router()
    const productsServ = new ProductsService()

    app.use("/api/products", router)

    router.get("/", async (req, res) => {
        const result = await productsServ.getAll()
        return res.json(result)
    })

    router.get("/:idProduct", async (req, res) => {
        const result = await productsServ.getById(req.params.idProduct)
        return res.json(result)
    })

    router.post("/", async (req, res) => {
        const result = await productsServ.create({
            ...req.body
        })
        return res.json(result)
    })

    router.put("/:idProduct", async (req, res) => {
        const result = await productsServ.update(req.params.idProduct, req.body)
        return res.json(result)
    })

    router.delete("/:idProduct", async (req, res) => {
        const result = await productsServ.delete(req.params.idProduct)
        return res.json(result)
    })

    /* router.post("/price", async (req, res) => {
        const result = await productsServ.filterByPrice(req.body)
        return res.json(result)
    })

    router.post("/category", async (req, res) => {
        const result = await productsServ.filterByCategory(req.body)
        return res.json(result)
    })

    router.post("/category-and-price", async (req, res) => {
        const result = await productsServ.filterByCategoryAndPrice(req.body)
        return res.json(result)
    })

    router.post("/category-and-range-price", async (req, res) => {
        const result = await productsServ.filterByCategoryAndRangePrice(req.body)
        return res.json(result)
    }) */
}

module.exports = products