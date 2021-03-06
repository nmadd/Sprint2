$(document).ready(function(){
            // var socket = io.connect('https://' + document.domain + ':' + location.port);
            var socket = io();
            socket.on('connect', function() {
                socket.emit('myEvent');
                console.log("Emitted");
            });
            socket.on('disconnect', function() {
                $('#log').append('<br>Disconnected');
            });
            socket.on('my response', function(msg) {
                $('#log').append('<br>Received: ' + msg.data);
            });

             socket.on("registered", function(msg){
                var redirectUrl = "https://" + window.location.hostname + '/' + msg;
                console.log(redirectUrl);
                window.location.replace(redirectUrl);
             })


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
                socket.emit('addUser', {val});

            });

        });
