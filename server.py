from flask import Flask, render_template, request
from flask import request
from flask_socketio import SocketIO, send, emit
import random

app = Flask(__name__, template_folder="templates")
socketio = SocketIO(app, cors_allowed_origins="*")

current_state = 'off'

@app.route("/")
def index():
    print('current_state =', current_state);
    return render_template("index.html", state=current_state)

@socketio.on("flip-switch")
def flip_switch(state):
    print("Switch flipped", state)
    global current_state
    current_state = state;
    emit('setstate', {"state": state}, broadcast=True)

if __name__ == "__main__":
    # auto-update when templates change so you don't have to restart app
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    socketio.run(app, host='0.0.0.0', port=5000)
