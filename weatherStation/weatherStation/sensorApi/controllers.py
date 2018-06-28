from flask import Blueprint

sensorApi = Blueprint('sensorApi', __name__)

@sensorApi.route('/')
def index():
    return "<h1>Sensor API</h1>"