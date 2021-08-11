const request = require('request')

const forecast = (lat, long, callback) => {
    const latlong = lat + ',' + long
    const url = 'http://api.weatherstack.com/current?access_key=bceb9f516cd55cc073a9f4c320ff57a8&query=' + encodeURIComponent(latlong)+ '&units=f'
    request({url : url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather server!')
        } else if (body.error){
            callback('Unable to find the location!')
        } else {
            const currently = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            // console.log()
            const data = {
                description : description,
                currently : currently,
                feelsLike : feelsLike, 
                summary : description + '. Its currently ' + currently + 'F degrees out. It feels like ' + feelsLike + 'F degres out.'
            }
            callback(undefined, data)
        }
    })
}
module.exports = forecast