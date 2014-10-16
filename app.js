var express = require('express'),
	http = require('http'),
	path = require('path'),
	EXPRESS_PORT = 3000,
	SOCKET_IO_PORT = 3001;


var app = express();

app.listen(SOCKET_IO_PORT, function () {
	console.log('[socket.io]', 'socket.io is listening on port:', SOCKET_IO_PORT);
});

app.all('*', function (req, res, next) {
	console.log('[express]', req.method, req.url);
	next();
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

var server = http.createServer(app).listen(EXPRESS_PORT, function () {
	console.log('[express]', 'express is listening on port:', EXPRESS_PORT);
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
	console.log('[socket.io]', 'socket:', socket.id, 'has connected');
	socket.on('offer', function (msg) {
		console.log(msg);
	});

	socket.on('disconnect', function () {
		console.log('[socket.io]', 'socket:', socket.id, 'has disconnected');
	});
});
