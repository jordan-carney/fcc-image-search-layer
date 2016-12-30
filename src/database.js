'use-strict'

const MongoClient = require('mongodb').MongoClient

let connection = {
    db: null,
}

module.exports = {

    connect: function(url, callback) {
        if (connection.db) {
          callback()
          return
        }

        MongoClient.connect(url, (err, db) => {

            connection.db = db
            callback(err)
        })
    },

    get: function() {
        return connection.db
    },

    logSearchSession: function(query) {
        const log = {
            term: query,
            when: new Date(),
        }

        connection.db.collection('search-log')
            .save(log), (err, result) => {
                if (err) {
                  console.log(err)
                  return
                }
            }
    },

    fetchSearchSessions: function(callback) {
        connection.db.collection('search-log')
            .find({}, { _id: 0 })
            .sort({ when: -1 })
            .limit(10)
            .toArray((err, results) => {
                callback(err, results)
            })

    },

}
