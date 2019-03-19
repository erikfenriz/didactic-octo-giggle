// Define all the handlers
let handlers = {};

// RestAPI route handlers
handlers.api = function (data, callback) {
    callback(200, {'name': 'sample handler'});
};

// RestAPI route handlers
handlers.info = function (data, callback) {
    callback(200, {
        "description": description,
        "address_input": "number",
        "address_owner": "number",
        "up_to_time": "datetime",
        "lottery_is_active": "boolean"
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

module.exports = {handlers, router};