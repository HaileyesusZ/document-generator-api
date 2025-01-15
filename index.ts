import express from "express"
import dotenv from "dotenv"
import documentRouter from "./src/documents/router"
import { connectDB } from "./database"

const app = express()

dotenv.config()

const PORT = process.env.PORT ?? 3000

app.use(express.json())

app.use("/api/documents", documentRouter)

app.listen(PORT, () => {
    console.log("Server started successfully")
    connectDB()
})