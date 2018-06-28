from flask import Blueprint

alertApi = Blueprint('alertApi', __name__)

@alertApi.route('/')
def index():
    return "<h1>Alert API</h1>"