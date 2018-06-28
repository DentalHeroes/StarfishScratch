from flask import Blueprint
from flask import jsonify
import dht11

class SensorData():
    def __init__(self, temp=0, humidity=0):
        self.temp = temp
        self.humidity = humidity
    
    def serialize(self):
        return {'temp' : self.temp, 'humidity' : self.humidity }

sensorApi = Blueprint('sensorApi', __name__)

@sensorApi.route('/')
def index():
    result = dht11.getData()
    if result:
        humidity, temperature = result
    else:
        humidity = 0
        temperature = 0
    result = SensorData(temperature, humidity)
    return jsonify(result.serialize())
