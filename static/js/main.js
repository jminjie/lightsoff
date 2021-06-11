var socket = io();
socket.on('connect', function(){
    console.log("Connected to server.")
});

socket.on('setstate', function(data) {
    var new_state = data['state'];
    var old_state = document.getElementById("lightswitch").getAttribute('state');
    console.log("setstate received, new_state=" + new_state + " old_state" + old_state);
    if (old_state != new_state) {
        setState(new_state);
    }
});

function setState(state) {
    var url = "static/switch-sound-2.mp3";
    new Audio(url).play();
    if (state == 'off') {
        document.getElementById("lightswitch").src="static/light-switch-off.png";
        document.getElementById("lightswitch").setAttribute('state', "off");
        document.getElementById("docbody").classList.add('dark');
    } else {
        document.getElementById("lightswitch").src="static/light-switch-on.png";
        document.getElementById("lightswitch").setAttribute('state', "on");
        document.getElementById("docbody").classList.remove('dark');
    }
}

function imageOnClick() {
    var switch_state = document.getElementById("lightswitch").getAttribute('state');
    if (switch_state == "on") {
        setState('off');
        socket.emit('flip-switch', 'off');
    } else {
        setState('on');
        socket.emit('flip-switch', 'on');
    }
}
