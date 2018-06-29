class mainWeather {
    constructor() {
        this.city;
        this.state;
        this.zip;

        this.getWeather = this.getWeather.bind(this);
        this.getSensorData = this.getSensorData.bind(this);
        this.getLocation();
        this.getSensorData();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather);
        }
    }

	getWeather(position) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude +"&appid=3c90ef0d527512b433ebf00ac0321e72",
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                var wrapper = $("#WeatherWrapper");
                wrapper.empty();
                wrapper.append(this.createWeatherWidg(data));

                $('#outside-weather-container').removeClass('hidden');
				 $('#alert-wrapper').removeClass('hidden');
                $('#loading').addClass('hidden');
            }.bind(this),
            error: function (error) {
                alert('Failed!');
            }
        });
    }

    getSensorData() {
        $.ajax({
            url: '/sensor',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var wrapper = $("#SensorDataWrapper");
                wrapper.empty();
                wrapper.append(this.createSensorDataWidg(data));
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
		this.city = data.name;
        var location = this.city;// + ', ' + this.state;

        $('#weather-icon').replaceWith(mappedData.icon);
        $('#weather-desc').text(mappedData.description);
        $('#weather-location').text(location);

        return "<p class='title'>Outside</p>" +
                "<p>Temperature: " + (data.main.temp - 273.15).toFixed(2) + " C</p>"+
                "<p>Wind Speed: " + data.wind.speed + "</p>" +
                "<p>Humidity: " + data.main.humidity + "%</p>" +
                "<p>Pressure: " + data.main.pressure + " hpa</p>";
    }

    createSensorDataWidg(data) {
        return "<p class='title'>Inside</p>" +
               "<p>Temperature: " + data.temp + " C</p>" +
               "<p>Humidity: " + data.humidity + "%</p>";
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
        image.src = '/static/assets/' + imageUrl;
        images.push(image);
    })
};

function getBackgroundImage() {
    var whichImage = Math.round(Math.random()*(images.length-1));
    $('#background-image').replaceWith(images[whichImage])
};

function sendAlert() {
    $.ajax({
        url: '/alert',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
           if (data.result == 1){
			   //alert("success");
		   } else {
			   alert("alert failed");
		   }
		   
        }.bind(this),
        error: function (error) {
            alert('Failed!');
        }
    });
};
