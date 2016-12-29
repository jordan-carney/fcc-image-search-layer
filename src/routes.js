'use-strict'

const express = require('express')
const router = express.Router()
const db = require('./database')
const gSearch = require('./gSearchAPI')

router.get('/', (req, res) => {

  if ( !req.query.q ) {
    res.send('SEARCH APP HOME')
    return
  }

  const query = req.query.q
  const perPage = ( req.query.num ) ? req.query.num : 1
  //TODO: Add pagination!
  gSearch(query, perPage, (data) => { res.send(data) })

  db.logSearchSession(query)

})


router.get('/recent', (req, res) => {

  db.fetchSearchSessions( (data) => {
    res.send(data)
  })

})


module.exports = router
