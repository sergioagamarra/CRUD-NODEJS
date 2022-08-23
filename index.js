const express = require("express")
const morgan = require("morgan")
const { port, sessionSecret } = require("./config")
const { connection } = require("./config/db")
const cors = require("cors")

// Routes:
const products = require("./routes/products")

const app = express()

connection()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000","http://127.0.0.1:5500"],
    credentials:true
}))

// Usando rutas:
products(app)

app.get("/", (req, res) => {
    return res.json({
        name: "CRUD Products"
    })
})

app.listen(port, () => {
    console.log("Listening on: http://localhost:" + port)
})
