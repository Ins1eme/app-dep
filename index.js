const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const config = require('./config')

const News = require('./models/News')
const Interview = require('./models/Interview')

app.set('view engine', 'pug')

app.use(helmet())
app.use(express.static('./public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(config.db, {
    useNewUrlParser: true,
})

app.get('/', async (req, res) => {
    const interview = await Interview.find({}).sort([['date', -1]])
    const news = await News.find({}).sort([['date', -1]]).limit(10)

    res.render(path.join(__dirname + '/static/pages/index'), {interview, news})
})

app.get('/news/:id', async (req, res) => {
    const news = await News.findOne({ title: req.params.id })
    if(news) {
        res.render(path.join(__dirname + '/static/pages/news-page'), { news })
    } else {
        res.redirect('/')
    }
})

app.get('/interview/:id', async (req, res) => {
    const interview = await Interview.findOne({ title: req.params.id })
    if (interview) {
        res.render(path.join(__dirname + '/static/pages/interview-page'), { interview })
    } else {
        res.redirect('/')
    }
})

app.get('/default', (req,res) => {
    res.render(path.join(__dirname + '/static/pages/default'))
})

app.post('/news', async (req, res) => {
    const news = await News.find().sort([['date', -1]]).skip(+req.body.offset).limit(+req.body.limit)
    if(news.length) {
        res.status(200).json(news)
    } else {
        res.send(false)
    }

})

app.listen(port, _ => {
    console.log(`Server running on port ${port}`)
})