import express from 'express'
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRouths from './routes/authRouth.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app= express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/auth", authRouths)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/products', productRoutes)

//rest api
app.get('/', (req, res)=>{
    res.send("<h1>Welcome to Grontho</h1>");
})

//PORT
const PORT= process.env.PORT || 8080;

//run listen
app.listen(PORT, ()=>{
    console.log(`server running on devlopment mode on port ${PORT}`.bgCyan.white);
})