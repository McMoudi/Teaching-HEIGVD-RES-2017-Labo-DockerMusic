var core = require('./core');

var dgram = require('dgram');
var net = require('net');
var client = dgram.createSocket("udp4");

client.bind(core.udpPort, function (err, msg) {
    client.addMembership(core.multicast);
});


var musicianMap = new Map();
var lastActivityMap = new Map();
client.on('message', function (err, msg) {
    var data = JSON.parse(err);

    lastActivityMap.set(data.uuid, new Date());

if(!musicianMap.has(data.uuid))    musicianMap.set(data.uuid, data);

    console.log("received " + data.uuid);


});

var server = net.createServer(function (socket) {

    var data = [];
    console.log("connection!");


    var value;
    var now = new Date();
    for (value of lastActivityMap) {
        var date = value[1];
        if(new Date().getTime() - date.getTime() <= 5000) // 5 miliseconds
        data.push(musicianMap.get(value[0]));
    }

    socket.write(JSON.stringify(data));

    socket.end();

});


server.listen(core.tcpPort);

console.log("ready!");