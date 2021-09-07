const express = require('express')
const path = require("path")
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','index.html'))
})


app.listen(PORT,()=>console.log(`server is listening at port ${PORT}`))