'use-strict'

require('dotenv').config()
const dbUrl = process.env.MONGO_URL
const express = require('express')
const app = express()
const db = require('./database')
const routes = require('./routes')

app.use('/', routes)

app.set('port', (process.env.PORT || 5000))

db.connect(dbUrl, (err) => {
    if (err) return console.log(err)

    app.listen(app.get('port'), () => {
        console.log('App is running! PORT:', app.get('port'))
    })
})
