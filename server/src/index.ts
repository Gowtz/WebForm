import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
const PORT = process.env.PORT || 8000;

import forms from './routes/forms'

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',forms)
app.get('/api',(_req,res)=>{

  res.send("Working")
}
)


app.listen(PORT,()=> console.log("Ther server is Running",PORT))
