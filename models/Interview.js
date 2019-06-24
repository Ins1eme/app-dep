const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    info: {
        type: String,
        require: true,
    },
    author: {
        type: String
    },
    imgUrl: {
        type: String,
        required: true,
    },
    imgSubUrls: {
        type: Array,
    },
    videoUrl: {
        type: String,
    },
    date: {
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Interview', itemSchema)
