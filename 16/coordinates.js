/*
*@function Для получения координат адреса
*
*@param {Object}  googleMapsClient  Объект инециализации Google Maps client
*@param {string}  town город
**/
module.exports.coordinates = function coordinates(town, googleMapsClient) {

	   return new Promise(function(resolve, reject) {
     
           googleMapsClient.geocode({
                address: town
            }, function(err, response) {
                if (!err) {
                    details = response.json.results;
                    let geodata = {
                        "latitude": details[0].geometry.location.lat,
                        "longitude": details[0].geometry.location.lng,
                    };
                    resolve(geodata);
                } else {
 					reject(err);
                }
            })
    })
}


