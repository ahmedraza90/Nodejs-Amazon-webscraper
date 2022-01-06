require('dotenv').config()
const express = require('express')
const request = require('request-promise')
const app = express()

const key = '1b23a0b38888d821511f83a01228694f'
const url = `http://api.scraperapi.com?api_key=${process.env.KEY}&autoparse=true`
app.use(express.json())

app.get('/',(req,res)=>{
   res.send('WELCOME TO AMAZON SCRAPER API')
}) 

app.get('/product/:productId', async (req,res)=>{
    
     const { productId } = req.params
     try{
         const response = await request(`${url}&url=https://www.amazon.com/dp/${productId}`)
         
     }catch(e){
        res.status(400).send(e)
     }
})

app.get('/product/:productId/reviews', async (req,res)=>{
    
    const { productId } = req.params
    try{
        const response = await request(`${url}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
        
    }catch(e){
       res.status(400).send(e)
    }
})

app.get('/product/:productId/offers', async (req,res)=>{
    
    const { productId } = req.params
    try{
        const response = await request(`${url}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
        
    }catch(e){
       res.status(400).send(e)  
    }
})

app.get('/search/:searchQuery', async (req,res)=>{
    
    const { searchQuery } = req.params
    try{
        const response = await request(`${url}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
        
    }catch(e){
       res.status(400).send(e)  
    }
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})