var dateTime    = require('node-datetime');
var coordinates = require('./coordinates.js');
var getTimezone = require('./getTimezone.js');


/**
 * Конвектор часовых поясов. 
 *
 * @param {string} kay  Google Api Kay https://developers.google.com/maps/documentation/timezone/start
 * @param {string} oneArdress Мой город
 * @param {string} otherAdress Город с которым нужно сравнить
 * 
 *@return {string} Возращает название города и разницу в часах
 */


class TimeDif {

    constructor(kay, oneTown, otherTown) {
        this.oneTown = oneTown;
        this.otherTown = otherTown;
        this.googleMapsClient = require('@google/maps').createClient({
            key: kay
        });
    }
    getTime() {
        var self = this;
        async function main() {
            try {
                let coordinates1 = await coordinates.coordinates(self.oneTown, self.googleMapsClient);
                let coordinates2 = await coordinates.coordinates(self.otherTown, self.googleMapsClient);

                let location1 = coordinates1.latitude + ',' + coordinates1.longitude;
                let location2 = coordinates2.latitude + ',' + coordinates2.longitude;

                let time1 = await getTimezone.getTimezone(self.googleMapsClient, location1, dateTime.create().getTime() / 1000);
                let time2 = await getTimezone.getTimezone(self.googleMapsClient, location2, dateTime.create().getTime() / 1000);

                let options1 = self.options(time1.timeZoneId)
                let formatter1 = new Intl.DateTimeFormat([], options1);
                let getTime1 = dateTime.create(formatter1.format(new Date())).format('H:M:S');


                let options2 = self.options(time2.timeZoneId)
                let formatter2 = new Intl.DateTimeFormat([], options2);
                let getTime2 = dateTime.create(formatter2.format(new Date())).format('H:M:S');

                let getDif = (time1.rawOffset - time2.rawOffset) / 3600;

                console.log(`Местное время в ${self.oneTown} ${getTime1}. Сейчас в ${self.otherTown} ${getTime2}. Разница во времени: ${getDif} час(ов)`);
            } catch (e) {
                console.log(e)
            }
        }
        main();
    }

    options(timeZone) {
        return {
            timeZone: timeZone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
    }
}

module.exports.timeDif = TimeDif;