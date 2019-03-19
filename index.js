let {getDescription, getAccounts, getTimeElapsed, getActivity} = require('./src/app');
const {address} = require('./src/lottery');
// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require("./server/config");
// const {handlers, router} = require("./server/routes");

// Configure the server to respond to all requests with a string
let server = http.createServer(function (req, res) {

    // Parse the url
    let parsedUrl = url.parse(req.url, true);

    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    let queryStringObject = parsedUrl.query;

    // Get the HTTP method
    let method = req.method.toLowerCase();

    //Get the headers as an object
    let headers = req.headers;

    // Get the payload,if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();

        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        let chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function (statusCode, payload) {

            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Use the payload returned from the handler, or set the default payload to an empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // Convert the payload to a string
            let payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("Returning this response: ", statusCode, payloadString);
        });
    });
});

// Start the server
server.listen(config.port, function () {
    console.log('The server is up and running on port ' + config.port + ' in ' + config.envName + ' mode.');
});

let description, account, elapsedTime, isActive;
getDescription().then(desc => description = desc);
getAccounts().then(acc => account = acc);
getTimeElapsed().then(time => elapsedTime = time);
getActivity().then(activity => isActive = activity);

// enterLottery();

//Define all the handlers
let handlers = {};

// RestAPI route handlers
handlers.api = function (data, callback) {
    callback(200, {'name': 'sample handler'});
};

// RestAPI route handlers
handlers.info = function (data, callback) {
    callback(200, {
        "description": description,
        "address_input": address,
        "address_owner": account[0],
        "up_to_time": elapsedTime + " seconds",
        "lottery_is_active": isActive
    });
};

handlers.payments = function (data, callback) {
    callback(200, [
            {
                "address": "number",
                "transfer": "number",
                "time": "datetime",
            },
            {
                "address": "number",
                "transfer": "number",
                "time": "datetime",
            }
        ]
    );
};

handlers.inactivePayments = function (data, callback) {
    callback(200, [
        {
            "address": "number",
            "transfer": "number",
            "time": "datetime",
        },
        {
            "address": "number",
            "transfer": "number",
            "time": "datetime",
        }]
    );
};

handlers.result = function (data, callback) {
    callback(200,
        {
            address: "address",
            total: "total",
            time: "time",
            result: "result"
        }
    );
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};

// Define the request router
const router = {
    'api/info': handlers.info,
    'api/payments': handlers.payments,
    'api/inactivePayments': handlers.inactivePayments,
    'api/result': handlers.result,
};

// module.exports = {handlers, router};