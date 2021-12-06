const request = require ('request')

const forecast = (latitude, longitude, callback) => {

    const forecast_url = 'http://api.weatherstack.com/current?access_key=5b16a65e07fc6476be568d9ec08f5577&query=' + encodeURI(latitude) + ',' + encodeURI(longitude)
    request({url: forecast_url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to network.', undefined);
        }else if(response.body.error){
            callback('Unable to find any location.', undefined);
        }else{            
            const data = {
                placeName : response.body.location.name + ', ' + response.body.location.country,
                weather_desc: response.body.current.weather_descriptions,
                temperature: response.body.current.temperature,
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast