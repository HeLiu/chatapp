const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server)
const port = process.env.PORT || 3000;
users = [];
connections = [];

server.listen(port);
console.log('Server running....');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected');
	socket.on('disconnect', function(data){
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets disconnected', connections.length);	
	});

	socket.on('send message', function(data){
		console.log(data);
		io.emit('new message', {msg: data, user: socket.username});
	});

	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	})

	function updateUsernames(){
		io.emit('get users', users);
	}
});

//server.listen(port);