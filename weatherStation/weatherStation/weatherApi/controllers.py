from flask import Blueprint

weatherApi = Blueprint('weatherApi', __name__)

@weatherApi.route('/')
def index():
    return "<h1>Weather API</h1>"