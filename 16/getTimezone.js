/*
*@function Для получения временной зоны
*
*@param {Object}  googleMapsClient  Объект инециализации Google Maps client
*@param {string}  location строка координат адреса (долгота,широта)
*@param {string}  timestamp время в секундах
**/

module.exports.getTimezone = function getTimezone(googleMapsClient, location, timestamp) {

	   return new Promise(function(resolve, reject) {
     
           googleMapsClient.timezone({
                location: location,
                timestamp: timestamp
            }, function(err, response) {
                if (!err) {
             
                    let timeZone = {
                        "rawOffset": response.json.rawOffset,
                        "timeZoneId": response.json.timeZoneId,
                    };
                    resolve(timeZone);
                } else {
 					reject(err);
                }
            })
    })
}

