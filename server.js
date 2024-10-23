const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const path = require('path')


app.get('/', (req, res) => {
    res.send('Hello world Backend Node')
})

app.listen(PORT, ()=> {
    console.log(`Example app running on Port ${PORT}`)
})