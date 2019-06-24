const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        require: true,
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
        type: Date,
        default: new Date(),
    },
})

module.exports = mongoose.model('News', itemSchema)
