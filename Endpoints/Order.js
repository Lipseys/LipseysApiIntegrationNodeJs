var optionsBuilders = require("../OptionsBuilders");
var request = require("request");


var order = (model, user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    if(!model || !model.Items || model.Items.length < 1){
        callback({authotized: false, success: false, errors: ["No line items on order"]});
        return;
    }
    if(model.Items.filter(function (x) {
        return (
            !x.ItemNo || x.ItemNo.length === 0 ||
                !x.Quantity || x.Quantity === 0
        )
    }).length > 0){
        callback({authotized: false, success: false, errors: ["One or more lines were missing item number or quantity"]});
        return;
    }

    var options = optionsBuilders.optionsBuilder(model, "integration/order/apiorder");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};

var allocationOrder = (model, user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    if(!model || !model.Items || model.Items.length < 1){
        callback({authotized: false, success: false, errors: ["No line items on order"]});
        return;
    }
    if(model.Items.filter(function (x) {
        return (
            !x.ItemNo || x.ItemNo.length === 0 ||
            !x.Quantity || x.Quantity === 0
        )
    }).length > 0){
        callback({authotized: false, success: false, errors: ["One or more lines were missing item number or quantity"]});
        return;
    }

    var options = optionsBuilders.optionsBuilder(model, "integration/order/AllocationOrder");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};


var dropShipAccessories = (model, user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    if(!model || !model.Items || model.Items.length < 1){
        callback({authotized: false, success: false, errors: ["No line items on order"]});
        return;
    }
    if(model.Items.filter(function (x) {
        return (
            !x.ItemNo || x.ItemNo.length === 0 ||
            !x.Quantity || x.Quantity === 0
        )
    }).length > 0){
        callback({authotized: false, success: false, errors: ["One or more lines were missing item number or quantity"]});
        return;
    }
    if(!model.PoNumber || model.PoNumber.length === 0 ||
        !model.BillingName || model.BillingName.length === 0 ||
        !model.BillingAddressLine1 || model.BillingAddressLine1.length === 0 ||
        !model.BillingAddressCity || model.BillingAddressCity.length === 0 ||
        !model.BillingAddressState || model.BillingAddressState.length === 0 ||
        !model.BillingAddressZip || model.BillingAddressZip.length === 0 ||
        !model.ShippingName || model.ShippingName.length === 0 ||
        !model.ShippingAddressLine1 || model.ShippingAddressLine1.length === 0 ||
        !model.ShippingAddressCity || model.ShippingAddressCity.length === 0 ||
        !model.ShippingAddressState || model.ShippingAddressState.length === 0 ||
        !model.ShippingAddressZip || model.ShippingAddressZip.length === 0){
        callback({authotized: false, success: false, errors: ["Missing fields: the following are req: PoNumber, " +
            "BillingName, BillingAddressLine1, BillingAddressCity, BillingAddressState, BillingAddressZip, " +
            "ShippingName, ShippingAddressLine1, ShippingAddressCity, ShippingAddressState, ShippingAddressZip"]});
        return;
    }

    if(model.BillingAddressZip.length !== 5 || model.ShippingAddressZip.length !== 5){
        callback({authotized: false, success: false, errors: ["States should be 2 letters and capital"]});
        return;
    }

    if(model.BillingAddressState.length !== 2 || model.ShippingAddressState.length !== 2){
        callback({authotized: false, success: false, errors: ["Zip codes should only be 5 digits"]});
        return;
    }


    var options = optionsBuilders.optionsBuilder(model, "integration/order/dropship");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};


var dropShipFirearms = (model, user, callback) => {
    if(!user || !user.token){
        callback({authotized: false, success: false, errors: ["Not logged in, please check password and reinit"]});
        return;
    }
    if(!model || !model.Items || model.Items.length < 1){
        callback({authotized: false, success: false, errors: ["No line items on order"]});
        return;
    }
    if(model.Items.filter(function (x) {
        return (
            !x.ItemNo || x.ItemNo.length === 0 ||
            !x.Quantity || x.Quantity === 0
        )
    }).length > 0){
        callback({authotized: false, success: false, errors: ["One or more lines were missing item number or quantity"]});
        return;
    }
    if(!model.Ffl || model.Ffl.length === 0 ||
        !model.Name || model.Name.length === 0 ||
        !model.Po || model.Po.length === 0 ||
        !model.Phone || model.Phone.length === 0){
        callback({authotized: false, success: false, errors: ["Missing fields: the following are req: Ffl, Name, Po, Phone"]});
        return;
    }
    if(model.Ffl.length !== 15){
        callback({authotized: false, success: false, errors: ["Ffl should be 15 digits long"]});
        return;
    }

    var options = optionsBuilders.optionsBuilder(model, "integration/order/DropShipFirearm");
    options.headers.Token = user.token;
    request(options, function (err, res, body) {
        if (err) callback({success: false, errors: [err]});
        callback(body);
    })
};
module.exports = {
    Order: order,
    AllocationOrder: allocationOrder,
    DropShipAccessories: dropShipAccessories,
    DropShipFirearms: dropShipFirearms
};
