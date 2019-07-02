const Groups = require('../models/groups');
const Room = require('../models/room');
const Chat = require('../models/chat');
const User = require('../models/user');

var socketConn = function(db){
    var deferred = Q.defer();
    client.on('connection', function(socket){
        let chat = db.collection('chats');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        Groups.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }
        // Get chats from mongo collection
        // Chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
        //     if(err){
        //         throw err;
        //     }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            console.log(data);
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                client.emit('cleared');
            });
        });
    });
    deferred.resolve();
    return deferred.promise;
}

getMongoDBCon().then(function(data){
    console.log('Response 1 ');
    return socketConn(data);
    
})
.catch(function(err){
    console.log(err)
});