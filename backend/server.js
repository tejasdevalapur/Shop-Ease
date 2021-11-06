import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/db.js'
import  productRoutes from './routes/productRoutes.js'
import  userRoutes from './routes/userRoutes.js'
import  orderRoutes from './routes/orderRoutes.js'
import  uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandler} from './middlewares/errormiddleware.js'
dotenv.config()
connectDB()
const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(express.json())


app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(res,req)=> res.sendFile(oath.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/',(req,res,next) => {
        res.send('API is running...')
    })
    
}

app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT || 5000
app.listen(PORT, console.log('Server running on port 5000'))