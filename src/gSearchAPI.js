const fetch = require('node-fetch')
const apiKey = process.env.GOOGLE_SEARCH_API_KEY
const gSearchAppId = process.env.GOOGLE_SEARCH_APP_ID
const db = require('./database')

module.exports = queryGoogleApi


function queryGoogleApi(query, paginate, callback) {
    const pagination = (( paginate - 1 ) * 10) + 1

    fetch('https://www.googleapis.com/customsearch/v1?key=' + apiKey + '&cx=' + gSearchAppId + '&searchType=image' + '&q=' + query + '&start=' + pagination)
        .then((resp) => resp.json())
        .then((json) => formatData(json))
        .then((data) => {
            db.logSearchSession(query)
            callback(null, data)
        })
        .catch((err) => {
            callback(err)
        })
}


function formatData(json) {
    if (json.searchInformation.totalResults == 0) return 'No Results.'

    const data = json.items
    let results = []

    data.forEach((val) => {
      results.push({
          url: val.link,
          snippet: val.snippet,
          thumbnail: val.image.thumbnailLink,
          context: val.image.contextLink,
      })
    })

    return results
}
