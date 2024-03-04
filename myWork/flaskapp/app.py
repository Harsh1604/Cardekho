from flask import Flask
from controller import *

app = Flask(__name__)

@app.route("/")
def welcome():
    return "Hello world"

@app.route("/home")
def home():
    return "this is home page"

if __name__=="__main__":
    app.run(debug=True)

