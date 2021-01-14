var optionsBuilders = require("../OptionsBuilders");
var request = require("request");


var catalogFeed = (user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    var options = optionsBuilders.getOptionsBuilder({}, "integration/items/CatalogFeed");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};
var catalogFeedItem = (user, item, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    if(!item || item.length === 0){
        callback({authotized: true, success: false, errors: ["Item number not provided"]});
        return;
    }
    var options = optionsBuilders.optionsBuilder(item, "integration/items/CatalogFeed/Item");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};
var pricingAndQuantityFeed = (user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    var options = optionsBuilders.getOptionsBuilder({}, "integration/items/PricingQuantityFeed");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};
var allocationPricingAndQuantityFeed = (user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    var options = optionsBuilders.getOptionsBuilder({}, "integration/items/Allocations");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};
var validateItem = (model, user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }

    if(!model || model.length === 0){
        callback({authotized: false, success: false, errors: ["Item number missing"]});
        return;
    }

    var options = optionsBuilders.optionsBuilder(model, "integration/items/validateitem");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};

module.exports = {
    CatalogFeed: catalogFeed,
    CatalogFeedItem: catalogFeedItem,
    PricingAndQuantityFeed: pricingAndQuantityFeed,
    AllocationPricingAndQuantityFeed: allocationPricingAndQuantityFeed,
    ValidateItem: validateItem

};
