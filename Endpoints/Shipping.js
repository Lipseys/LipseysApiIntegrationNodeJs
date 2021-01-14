var optionsBuilders = require("../OptionsBuilders");
var request = require("request");


var oneDayShipping = (model, user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    if(!model){
        callback({authotized: false, success: false, errors: ["Date Field is missing, an example Date Field could be 5 days ago: new Date(new Date() - (1000 * 60 * 60 * 24 * 5))"]});
        return;
    }

    var options = optionsBuilders.optionsBuilder(model, "integration/shipping/oneday");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};

module.exports = {
    OneDayShipping: oneDayShipping
};