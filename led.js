const gpio = require('rpi-gpio');
const express = require('express');
const EventEmitter = require('events');

let STATUS;

// Server config and routes

const app = express();
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/public/scripts'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.post('/switch/:how', function (req, res) {
  let how = req.params.how,
    switched = false;

  if (how === 'on') {
    switchLED(true);
    switched = true;
  } else if (how === 'off') {
    switchLED(false);
    switched = true;
  } else {
    console.log("Switch call can only take 'on' or 'off'");
  }

  if (switched) {
    res.status(200).json({status: how});
  } else {
    res.status(404).json({status: undefined});
  }
});

app.get('/status', function (req, res) {
  res.status(200).json({status: STATUS});
});

app.listen(3000, function () {
  console.log('App listening on port 3000.');
});

//GPIO setup and switch function

gpio.setup(12, gpio.DIR_OUT);

function switchLED(how) {
  if (STATUS !== (how ? 'on' : 'off')) {
    gpio.write(12, how, function (err) {
      if (err) throw err;
      STATUS = how ? 'on' : 'off';

      console.log('Turned pin 12 ' + STATUS);
    });
  } else {
    console.log('Did nothing...');
  }
}
