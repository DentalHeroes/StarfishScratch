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
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + this.zip + ',us' + "&appid=3c90ef0d527512b433ebf00ac0321e72",
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                var wrapper = $("#WeatherWrapper");
                wrapper.empty();
                wrapper.append(this.createWeatherWidg(data));

                $('#outside-weather-container').removeClass('hidden');
                $('#loading').addClass('hidden');
            }.bind(this),
            error: function (error) {
                alert('Failed!');
            }
        });
    }

    mapWeather(description, isDay) {
        switch (description) {
            case 'clear sky':
                if (isDay) {
                    return {
                        description: 'Sunny',
                        icon: '<span id="weather-icon" class="fas fa-sun"></span>'
                    }
                } else {
                    return {
                        description: 'Clear Skies',
                        icon: '<span id="weather-icon" class="fas fa-moon"></span>'
                    }
                }
            case 'few clouds':
                return {
                    description: 'Partly Cloudy',
                    icon: '<span id="weather-icon" class="fas fa-cloud"></span>'
                }
            case 'scattered clouds':
            case 'broken clouds':
            case 'mist':
                return {
                    description: 'Cloudy',
                    icon: '<span id="weather-icon" class="fas fa-cloud"></span>'
                }
            case 'shower rain':
            case 'rain':
                return {
                    description: 'Rainy',
                    icon: '<span id="weather-icon" class="fas fa-tint"></span>'
                }
            case 'thunderstorm':
                return {
                    description: 'Thunderstorm',
                    icon: '<span id="weather-icon" class="fas fa-bolt"></span>'
                }
            case 'snow':
                return {
                    description: 'Snowing',
                    icon: '<span id="weather-icon" class="fas fa-snowflake"></span>'
                }
        }
    }

    createWeatherWidg(data) {
        var isDay = this.isDaytime(new Date(data.sys.sunrise), new Date(data.sys.sunset));
        var mappedData = this.mapWeather(data.weather[0].description, isDay);
        var location = this.city + ', ' + this.state;

        $('#weather-icon').replaceWith(mappedData.icon);
        $('#weather-desc').text(mappedData.description);
        $('#weather-location').text(location);

        return "<p class='title'>Outside</p>" +
                "<p>Temperature: " + (data.main.temp - 273.15).toFixed(2) + " C</p>"+
                "<p>Wind Speed: " + data.wind.speed + "</p>" +
                "<p>Humidity: " + data.main.humidity + "%</p>" +
                "<p>Pressure: " + data.main.pressure + " hpa</p>";
    }

    isDaytime(sunrise, sunset) {
        var current = new Date();
        var currentSec = this.getDaySeconds(current);
        var sunriseSec = this.getDaySeconds(sunrise);
        var sunsetSec = this.getDaySeconds(sunset);

        return currentSec > sunriseSec && currentSec < sunsetSec;
    }

    getDaySeconds(time) {
        return time.getSeconds() + (60 * (time.getMinutes() + (60 * time.getHours())))
    }
}

var images = [];

function setImageArray(arr) {
    arr.forEach(function(imageUrl) {
        var image = new Image();
        image.id = 'background-image';
        image.src = "/static/assets/" + imageUrl;
        images.push(image);
    })
};

function getBackgroundImage() {
    var whichImage = Math.round(Math.random()*(images.length-1));
    $('#background-image').replaceWith(images[whichImage])
};
