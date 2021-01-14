var optionsBuilders = require("../OptionsBuilders");
var request = require("request");




var login = (username, password, callback) => {
    if(!username || username.length === 0 || !password || password.length === 0){
        callback({authotized: false, success: false, errors: ["Username Or Password missing"]});
        return;
    }

    var model = { Email: username, Password: password };
    var options = optionsBuilders.optionsBuilder(model, "integration/authentication/login");

    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};


module.exports = {
    Login: login
};
