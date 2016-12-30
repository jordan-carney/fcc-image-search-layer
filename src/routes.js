'use-strict'

const express = require('express')
const router = express.Router()
const db = require('./database')
const gSearch = require('./gSearchAPI')

router.get('/', (req, res) => {
    // Ensure query was submitted
    if (!req.query.q) {
        res.sendFile(__dirname + '/public/index.html')
        return
    }

    // Collect query params
    const query = req.query.q
    let paginate = 1
    if ( req.query.offset && parseInt(req.query.offset) ) {
      paginate = parseInt(req.query.offset)
    } else if ( req.query.offset && !parseInt(req.query.offset) ) {
      res.send('Please use a number for pagination.')
      return
    }

    // Run query
    gSearch(query, paginate, (err, data) => {
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
