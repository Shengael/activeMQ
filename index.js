const express = require('express');
const stompit = require('stompit');
const amqp = require('amqp');

const app = express();

app.get('/toto', (req, res) => {
    console.log("salut");
 
var connection = amqp.createConnection({
    host: 'microservices-esgi-tst.eastus2.cloudapp.azure.com',
    port: '5001',
    login: 'admin',
    password: 'admin',
    authMechanism: 'AMQPLAIN',
    vhost: '/'
});
 
    // add this for better debuging
    connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
    });
    
    // Wait for connection to become established.
    connection.on('ready', function () {
    // Use the default 'amq.topic' exchange
    connection.queue('my-queue', function (q) {
        // Catch all messages
        q.bind('#');
        
        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log(message);
        });
    });
    });
});


app.listen(3000, () => console.log('listening ...'));