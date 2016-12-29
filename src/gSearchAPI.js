const fetch = require('node-fetch')
const apiKey = process.env.GOOGLE_SEARCH_API_KEY
const gSearchAppId = process.env.GOOGLE_SEARCH_APP_ID


module.exports = queryGoogleApi


function queryGoogleApi (query, paginate, callback) {
  const pagination = paginate * 10

  try {
    fetch( 'https://www.googleapis.com/customsearch/v1?key=' + apiKey + '&cx=' + gSearchAppId + '&q=' + query + '&start=' + pagination)
      .then( (response) => response.json() )
      .then( (json) => formatData(json) )
      .then( (data) => { callback(data) })
      .catch( (err) => {
        console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
}


function formatData (json) {
  const data = json.items
  let results = []

  data.forEach( (val) => {

    const hasImageFull = ( val.pagemap.cse_image )
    const hasImageThumb = ( val.pagemap.cse_thumbnail )

    if (hasImageFull && hasImageThumb) {
      results.push({
        url: val.pagemap.cse_image[0].src,
        snippet: val.snippet,
        thumbnail: val.pagemap.cse_thumbnail[0].src,
        context: val.link,
      })
    } else {
      //TODO: Need to create solution for odd image data from Google
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
