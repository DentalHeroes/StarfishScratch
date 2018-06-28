from flask import Blueprint
from flask import jsonify

class SensorData():
    def __init__(self, temp=0, humidity=0):
        self.temp = temp
        self.humidity = humidity
    
    def serialize(self):
        return {'temp' : self.temp, 'humidity' : self.humidity }

sensorApi = Blueprint('sensorApi', __name__)

@sensorApi.route('/')
def index():
    result = SensorData(80, 20)
    return jsonify(result.serialize())