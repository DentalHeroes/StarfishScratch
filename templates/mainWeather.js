class mainWeather {
    constructor() {
        this.city;
        this.state;
        this.zip;

        this.showPosition = this.showPosition.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    showPosition(position) {
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ','+ position.coords.longitude + '&sensor=true',
            type: 'get',
            success: function (data) {
                var addressArray = data.results[5].formatted_address.split(', ');
                this.city = addressArray[0];
                this.state = addressArray[1];
                this.zip = data.results[2].formatted_address.split(', ')[1].slice(3);
                this.getWeather();
            }.bind(this),
            error: function (error) {
                alert("We're sorry, there seems to be an error, please try again")
            }
        })
    }

    getWeather() {
        debugger
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + this.zip + ',us' + "&appid=3c90ef0d527512b433ebf00ac0321e72",
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                var wrapper = $("#WeatherWrapper");
                wrapper.empty();
                wrapper.append("<div class='city'> <p>Place: " + this.city + ", " + this.state + "</p></div>");
                wrapper.append(this.createWeatherWidg(data));
            }.bind(this),
            error: function (error) {
                alert('Failed!');
            }

        });
    }

    createWeatherWidg(data) {
        return "<div class='pressure'> <p>Temperature: " + (data.main.temp - 273.15).toFixed(2) + " C</p></div>"+
                "<div class='description'> <p>Title: " + data.weather[0].main + "</p></div>" +
                "<div class='description'> <p>Description: " + data.weather[0].description + "</p></div>" +
                "<div class='wind'> <p>Wind Speed: " + data.wind.speed + "</p></div>" +
                "<div class='humidity'> <p>Humidity: " + data.main.humidity + "%</p></div>" +
                "<div class='pressure'> <p>Pressure: " + data.main.pressure + " hpa</p></div>";
    }
}
