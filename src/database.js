'use-strict'

const MongoClient = require('mongodb').MongoClient

let connection = {
    db: null,
    rando: Math.random(),
}

module.exports = {

    connect: function(url, callback) {
        if (connection.db) return callback()

        MongoClient.connect(url, (err, db) => {

            connection.db = db
            callback(err)
        })
    },

    get: function() {
        return connection.db
    },

    logSearchSession: function(query) {
        console.log(connection.rando)
        const log = {
            term: query,
            when: new Date(),
        }

        connection.db.collection('search-log')
            .save(log), (err, result) => {
                if (err) return console.log(err)
                return console.log(result)
            }
    },

    fetchSearchSessions: function(callback) {
        console.log(connection.rando)
        connection.db.collection('search-log')
            .find({}, { _id: 0 })
            .sort({ when: -1 })
            .limit(10)
            .toArray((err, results) => {
                callback(err, results)
            })

    },

}
