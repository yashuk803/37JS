var HttpClient = function() {
    /**@method Get запроса
     *
     *@param {string} url
     *@param {HttpClientCallback} callback - Получить ответ запроса.
     */
    this.get = function(url, callback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                callback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", url, true);
        anHttpRequest.send(null);
    }
}
/** @function
 * @name loadСurrencys загружает курс валют */
function loadСurrencys() {
    let url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR0e-FpR39qr1EMc2Ew2jgbRXgJTOeQ52FIi-ARcF6vIE1kSvLONrIaJdM4";
    var client = new HttpClient();
    client.get(url, function(response) {
        alert(response);
    });
}