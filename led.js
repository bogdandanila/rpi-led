var gpio = require('rpi-gpio');
var express = require('express');

var app = express();
 
app.get('/', function(req, res) {
	res.send('Hello World');
});

// gpio.setup(12, gpio.DIR_OUT, write);
 
function write() {
	gpio.write(12, false, function(err) {
		if (err) throw err;
		console.log('Written to pin');
	});
}


app.listen(3000, function() {
	console.log('App listening on port 3000.');
});
