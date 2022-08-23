require("dotenv").config()

console.log(process.env.DB_NAME)

const config = {
    production:process.env.NODE_ENV==="production",
    development:process.env.NODE_ENV==="development",
    port: process.env.PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    callbackURL: process.env.CALLBACK_URL,
    callbackURLDev: process.env.CALLBACK_URL_DEVELOPMENT
}

module.exports = config