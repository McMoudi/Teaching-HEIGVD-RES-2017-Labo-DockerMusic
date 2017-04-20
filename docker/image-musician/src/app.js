/*
 * Include standard and third-party npm modules
 */
var net = require('net');
var Chance = require('chance');

var chance = new Chance();

var protocol = require('./core');

var instrument = process.argv[2];
var sound = protocol.instruments[instrument];

function generateGuid() {
    var result, i, j;
    result = '';
    for(j=0; j<32; j++) {
        if( j == 8 || j == 12|| j == 16|| j == 20)
            result = result + '-';
        i = Math.floor(Math.random()*16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}

var uuid = generateGuid();

if (!sound) {
    console.log("couldn't find instrument");
    return -1;
}


var dgram = require('dgram');
var server = dgram.createSocket("udp4");

var data = {
        "uuid":uuid,
        "instrument":instrument,
        "activeSince":new Date().toJSON()
    };
data=JSON.stringify(data);
setInterval(function () {

    server.send(data, 0, data.length, protocol.udpPort, protocol.multicast);
    console.log("sent " + sound);




}, 1000);



