var request = require("request");
var optionsBuilders = require("./OptionsBuilders");

var auth = require("./Endpoints/Authentication");
var inventory = require("./Endpoints/Inventory");
var orders = require("./Endpoints/Order");
var shipping = require("./Endpoints/Shipping");


var Username = "";
var Password = "";
var User = undefined;


var Init = (username, password, callback) => {
    Username = username;
    Password = password;

    if(!Init.lookup) Init.lookup = {};
    else{
        if(Init.lookup[`${username}-----${password}`]){
            console.log("using cached");
            console.log(Init.lookup[`${username}-----${password}`]);
            callback(Init.lookup[`${username}-----${password}`]);
            return;
        }
    }
    auth.Login(username, password, function (user) {
        if(user && user.econtact && user.econtact.success){
            User = user;
            Init.lookup[`${username}-----${password}`] = user;
            callback(user);
        }
    });

};

var checkLogin = function(callback){
    if(User){
        callback(User);
    }
    auth.Login(Username, Password, function (user) {
        if(user && user.econtact && user.econtact.success) {
            if (!Init.lookup) Init.lookup = {[`${Username}-----${Password}`]: user};
            else {
                Init.lookup[`${Username}-----${Password}`] = user;
            }
        } else{
            if(Init.lookup[`${Username}-----${Password}`]){
                Init.lookup[`${Username}-----${Password}`] = undefined;
            }
        }
        callback(user);

    });
};

var CatalogFeed = function (callback) {
    checkLogin(function (user) {
        inventory.CatalogFeed(user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    inventory.CatalogFeed(againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var CatalogFeedItem = function (itemNumber, callback) {
    checkLogin(function (user) {
        inventory.CatalogFeedItem(user, itemNumber, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    inventory.CatalogFeed(againUser, itemNumber, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var PricingAndQuantityFeed = function (callback) {
    checkLogin(function (user) {
        inventory.PricingAndQuantityFeed(user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    inventory.PricingAndQuantityFeed(againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var AllocationPricingAndQuantityFeed = function (callback) {
    checkLogin(function (user) {
        inventory.AllocationPricingAndQuantityFeed(user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    inventory.AllocationPricingAndQuantityFeed(againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var ValidateItem = function (model, callback) {
    checkLogin(function (user) {
        inventory.ValidateItem(model, user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    inventory.ValidateItem(model, againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var Order = function (model, callback) {
    checkLogin(function (user) {
        orders.Order(model, user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    orders.Order(model, againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var AllocationOrder = function (model, callback) {
    checkLogin(function (user) {
        orders.AllocationOrder(model, user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    orders.AllocationOrder(model, againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};


var DropShipAccessories = function (model, callback) {
    checkLogin(function (user) {
        orders.DropShipAccessories(model, user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    orders.DropShipAccessories(model, againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var DropShipFirearms = function (model, callback) {
    checkLogin(function (user) {
        orders.DropShipFirearms(model, user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    orders.DropShipFirearms(model, againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};

var OneDayShipping = function (model, callback) {
    checkLogin(function (user) {
        shipping.OneDayShipping(model, user, function (result) {
            if(result && result.hasOwnProperty("authorized") && !result.authorized){
                User = undefined;
                checkLogin(function (againUser) {
                    shipping.OneDayShipping(model, againUser, callback);
                })
            } else{
                callback(result);
            }
        })
    });
};



module.exports = {
    Init: Init,
    Inventory: {
        CatalogFeed: CatalogFeed,
        CatalogFeedItem: CatalogFeedItem,
        PricingAndQuantityFeed: PricingAndQuantityFeed,
        AllocationPricingAndQuantityFeed: AllocationPricingAndQuantityFeed,
        ValidateItem: ValidateItem
    },
    Orders: {
        Order: Order,
        DropShipAccessories: DropShipAccessories,
        DropShipFirearms: DropShipFirearms,
        AllocationOrder: AllocationOrder
    },
    Shipping: {
        OneDayShipping: OneDayShipping
    },
};
