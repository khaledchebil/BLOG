const mongoose = require('mongoose')

let articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dateNTime : {
        type: Date, 
        default: Date.now
    }, 
    // userId : {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
    
})

module.exports = mongoose.model('articles', articlesSchema);