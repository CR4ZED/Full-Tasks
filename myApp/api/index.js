const express = require('express')
const cors = require('cors')
const user = require('User')
const auth = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 8081

app.use(cors())
app.use(express.json())

app.post("/user",async (req,res)=>{
    const userData = req.body
    const token =await user.create(userData)
    console.log(token)
    res.setHeader('Authorization',`Bearer ${token}`)
    res.redirect("/home")
    // res.send({msg:'OK'})
})

app.get("/home",auth,(req,res)=>{
    const user = req.user
    res.send({msg:'welcome! '+user})
})

app.listen(PORT,()=>{
    console.log(`API is listening at ${PORT}`)
})