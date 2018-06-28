from flask import Flask
from weatherStation.home.controllers import home
from weatherStation.alertApi.controllers import alertApi
from weatherStation.sensorApi.controllers import sensorApi
from weatherStation.weatherApi.controllers import weatherApi

app = Flask(__name__)

app.register_blueprint(home, url_prefix='/')
app.register_blueprint(alertApi, url_prefix='/alert')
app.register_blueprint(sensorApi, url_prefix='/sensor')
app.register_blueprint(weatherApi, url_prefix='/weather')
