const mongoose = require('mongoose')
const config =require('config')
const db= config.get('mongoURI')
const myDB= ()=>{

    mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true }, ()=>{
        try {
            console.log('Database connected')
        } catch (error) {
            console.log('faile to connect to database!', error)
        }
    })
}

module.exports = myDB;