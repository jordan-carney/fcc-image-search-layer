const fetch = require('node-fetch')
const apiKey = process.env.GOOGLE_SEARCH_API_KEY
const gSearchAppId = process.env.GOOGLE_SEARCH_APP_ID
const db = require('./database')

module.exports = queryGoogleApi


function queryGoogleApi(query, paginate, callback) {
    const pagination = paginate * 10

    try {
        fetch('https://www.googleapis.com/customsearch/v1?key=' + apiKey + '&cx=' + gSearchAppId + '&q=' + query + '&start=' + pagination)
            .then((resp) => resp.json())
            .then((json) => formatData(json))
            .then((data) => {
                db.logSearchSession(query)
                callback(null, data)
            })
            .catch((err) => {
                callback(err)
            })
    } catch (err) {
        callback(err)
    }
}


function formatData(json) {
    if (json.searchInformation.totalResults == 0) return 'No Results.'

    const data = json.items
    let results = []

    data.forEach((val) => {

        const hasImageFull = (val.pagemap.cse_image && val.pagemap.cse_image.length)
        const hasImageThumb = (val.pagemap.cse_thumbnail && val.pagemap.cse_image.length)

        if (hasImageFull && hasImageThumb) {
            results.push({
                url: val.pagemap.cse_image[0].src,
                snippet: val.snippet,
                thumbnail: val.pagemap.cse_thumbnail[0].src,
                context: val.link,
            })
        } else {
            //TODO: Need to create solution for odd image-data structures from Google
            results.push({
                url: '',
                snippet: val.snippet,
                thumbnail: '',
                context: val.link
            })
        }
    })

    return results
}
