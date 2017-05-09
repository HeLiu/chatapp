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
	console.log('Connected: %s sockets connected')
})