$(document).ready(function(){
            namespace = '/test';
            var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);
            socket.on('connect', function() {
                socket.emit('myEvent', {data: 'I\'m connected!'});
                console.log("Emitted");
            });
            socket.on('disconnect', function() {
                $('#log').append('<br>Disconnected');
            });
            socket.on('my response', function(msg) {
                $('#log').append('<br>Received: ' + msg.data);
            });
            // event handler for server sent data
            // the data is displayed in the "Received" section of the page
            // handlers for the different forms in the page
            // these send data to the server in a variety of ways
            $('.login-button').click(function(event) {
                var val = $("#username").val();
                if(val == ""){
                    return;
                }
                console.log("here");
                socket.emit('addUser', {data: $('#username').val()});
                var redirectUrl = "http://localhost:5000/main";
                window.location.replace(redirectUrl);
            });
           
        });