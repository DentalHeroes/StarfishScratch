from flask import Blueprint
from flask import jsonify
import dht11

class SensorData():
    def __init__(self, errorCode=0, temp=0, humidity=0):
        self.errorCode = errorCode
        self.temp = temp
        self.humidity = humidity
    
    def serialize(self):
        return {'errorCode' : self.errorCode, 'temp' : self.temp, 'humidity' : self.humidity }

sensorApi = Blueprint('sensorApi', __name__)

@sensorApi.route('/')
def index():
    dth11Object = dht11.DTH11(14)
    result = dth11Object.read()
    if result:
        errorCode = result.errorCode
        humidity = result.humidity
        temperature = result.temperature
    else:
        errorCode = 0
        humidity = 0
        temperature = 0
    result = SensorData(errorCode, temperature, humidity)
    return jsonify(result.serialize())
