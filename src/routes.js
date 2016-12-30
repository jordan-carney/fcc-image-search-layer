'use-strict'

const express = require('express')
const router = express.Router()
const db = require('./database')
const gSearch = require('./gSearchAPI')

router.get('/', (req, res) => {

    if (!req.query.q) {
        res.sendFile(__dirname + '/public/index.html')
        return
    }

    const query = req.query.q
    const perPage = (req.query.offset) ? req.query.offset : 1

    gSearch(query, perPage, (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(data)
        }
    })
})


router.get('/recent', (req, res) => {

    db.fetchSearchSessions((err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(data)
        }
    })

})


module.exports = router
