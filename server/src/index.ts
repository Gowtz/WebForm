import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import {rateLimit} from 'express-rate-limit'
const PORT = process.env.PORT || 8000;

import forms from './routes/forms'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100, 
  standardHeaders: 'draft-8', 
  legacyHeaders: false, 
  // Fix Me : Add redis
})

const app = express()
app.use(cors())
app.use(limiter)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',forms)
app.get('/api',(_req,res)=>{

  res.send("Working")
}
)


app.listen(PORT,()=> console.log("Ther server is Running",PORT))
