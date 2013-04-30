var connect = require('connect'),
    sharejs = require('share').server;

var share_server = connect(
		     connect.logger(),
		     connect.static(__dirname + '/public')
		     );

if (process.env.REDISCLOUD_URL) {
	var redis = require('redis');
	var url = require('url');
	var redisURL = url.parse(process.env.REDISCLOUD_URL);
	var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
	client.auth(redisURL.auth.split(":")[1]);
	var options = {db: {type: 'redis', hostname: redisURL.hostname, port: redisURL.port, auth: redisURL.auth.split(":")[1]}}; // See docs for options. {type: 'redis'} to enable persistance.

} else {
	var redis = require("redis").createClient();
	var options = {db: {type: 'redis'}}; // See docs for options. {type: 'redis'} to enable persistance.

}

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(share_server, options);

var port = Number(process.env.PORT || 9000);

share_server.listen(port, function(){
	console.log('Server running at http://127.0.0.1:' + port + "/");
});