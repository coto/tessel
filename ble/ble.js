// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This Bluetooth Low Energy module demo scans
for nearby BLE peripherals. Much more fun if
you have some BLE peripherals around.
*********************************************/

var tessel = require('tessel');
var blelib = require('ble-ble113a');

var ble = blelib.use(tessel.port['A']);
var interval;

ble.on('ready', function(err) {
    if (err) return console.log(err);
    console.log('Scanning...');
    ble.startScanning();
});

ble.on('discover', function(peripheral) {
  console.log("Discovered peripheral!", peripheral.toString());
  //console.log("Discovered peripheral: ", peripheral.rssi);
});



