var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
const route = require('./server/routes/route');
const post = require('./server/routes/post');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const Groups = require('./server/models/groups');
const Room = require('./server/models/room');
const Chat = require('./server/models/chat');
const User = require('./server/models/user');

mongoose.connect('mongodb://localhost:27017/contact')
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyparser.json());

app.use('/api',route)
app.use('/api',post)
app.get('/', (req, res)=>{
    res.send('foobar');
})


client = {}
user_socket = {}
io.on('connection', (socket) =>{
    console.log('a user is connected')
    
    socket.on('getrooms',(userid)=>{
        user_socket[userid] = socket
        Room.aggregate([{"$match":{"users":userid}},{"$lookup":{
            "from": "chats",
            "localField": "_id",
            "foreignField": "room_id",
            "as": "msgs"
        }}],function(err, rooms){
            for(let i of rooms){
                if(i._id.toString() in client){
                    client[i._id.toString()][userid] = socket
                }
                else{
                    var temp = {}
                    temp[userid] = socket
                    client[i._id.toString()] = temp;
                }
                
            }
            io.emit('outputrooms', rooms);
        })
        Groups.find({"user_id":userid},function(err, groups){
            io.emit('outputgroups', groups);
        })
        User.find({},function(err, users){
            io.emit('outputusers', users);
        })
    })
    socket.on("sendmsg",(data)=>{
        if(data.room._id==null){
            var room = new Room()
            room.users = data.room.users
            room.save((err, newroom)=>{
                if(err){}
                else{
                    for(let i of data.room.users){
                        user_socket
                        if(newroom._id.toString() in client){
                            client[newroom._id.toString()][i] = user_socket[i]
                        }
                        else{
                            var temp = {}
                            temp[i] = user_socket[i]
                            client[newroom._id.toString()] = temp;
                        }
                    }
                    var chat = new Chat()
                    chat.room_id = newroom._id;
                    chat.msg = data.msg;
                    chat.user_name = data.user_name;
                    chat.save((err,newMsg)=>{
                        for(let i in client[newroom._id.toString()]){
                            // for(const [k, v] of client[newroom._id][i]){
                                client[newroom._id.toString()][i].emit('sendmsgtoclient',newMsg)
                            // }
                        }
                    })
                }
            })
        }
        else{
            var chat = new Chat()
            chat.room_id = data.room._id;
            chat.msg = data.msg;
            chat.user_name = data.user_name;
            chat.save((err,newMsg)=>{
                console.log(err);
                for(let i in client[data.room._id]){
                    client[data.room._id][i].emit('sendmsgtoclient',newMsg)
                    // for(let k in client[data.room._id][i]){
                        
                    // }
                }
            })
        }
        
    })
  })

  var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
  });