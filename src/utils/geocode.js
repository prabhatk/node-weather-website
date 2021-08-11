const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhYmhhdGthc2VyYSIsImEiOiJja3J4aDdlZ3MwcWN5MnZxbnFhNTZlcTJtIn0.Q4jlSNmhYI1VMknjqgvQUw&limit=1'
    request({url, json : true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0){
            callback('Unable to find the location!')
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const location = body.features[0].place_name
            const data = {
                latitude : lat,
                longitude : long,
                location : location
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode