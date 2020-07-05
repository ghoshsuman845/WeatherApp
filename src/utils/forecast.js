const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=fb86cbb0ce6a4033bf2125908200307&q='+ latitude +',' + longitude + '&days=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.condition.text + ' day. ' + 'The temperature is '+ body.current.temp_c + ' degrees celcius with ' + body.current.precip_mm + '% chances of rain.')
        }
    })
}

module.exports = forecast
