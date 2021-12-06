const request = require ('request')

const geocode = (address, callback) => {

    const geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiYmlkeXV0LW0iLCJhIjoiY2t3amdxaTc2MWlhMDJucWJ6MGJsY3owMiJ9.DbhSyiVCxPYniJL668tbPQ'
    
    request({url: geocode_url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to network.', undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find any location.', undefined);
        }else{            
            const data = {
                placeName : response.body.features[0].place_name,
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode