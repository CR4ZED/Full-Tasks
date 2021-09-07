const {Datastore} = require('@google-cloud/datastore')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const projectId = 'gcp-demo-325209'
const datastore = new Datastore({projectId})

async function create(userData){
    const kind = 'User'
    const key = datastore.key([kind])
    userData.password = await bcrypt.hash(userData.password,12)
    try{
        await datastore.insert({key,data:userData})
        return  jwt.sign({id:key.id},'mysecret')
    }catch(err){
        return err
    }
    console.log('saved 1 user')
}

 create({name:'james',email:'james@gmail.com',password:"password"}).then(token=>{
    console.log(token)
})

module.exports = {create}