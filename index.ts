import express from "express"
import dotenv from "dotenv"
import documentRouter from "./src/documents/router"
import { connectDB } from "./database"

const app = express()

dotenv.config()

const PORT = process.env.PORT ?? 3000

app.use(express.json())

// middleware for authorization

const authMiddleware = () => {
    // make an api request to auth service
    // using provided credentials

    // if authenticated, it would proceed to the next middleware
    // if not, it would respond 401

    // for authorization, i would check the current users' permission
    // against the route definition permission
    // i would either let the request through or send a 403.
}

app.use("/api/documents", authMiddleware,  documentRouter)

app.listen(PORT, () => {
    console.log("Server started successfully")
    connectDB()
})