//imports
var LipseysApi = require("./index");

LipseysApi.Init("email", "password", function (res) {
    console.log(res);
});

//Catalog Feed
LipseysApi.Inventory.CatalogFeed(function (res) {console.log(res);});

//Catalog Feed Item
LipseysApi.Inventory.CatalogFeedItem("RU1022RB", function (res) {console.log(res);});

//Pricing And Quantity Feed
LipseysApi.Inventory.PricingAndQuantityFeed(function (res) {console.log(res);});

//Allocation Pricing And Quantity Feed
LipseysApi.Inventory.AllocationPricingAndQuantityFeed(function (res) {console.log(res);});

//Validate Item
LipseysApi.Inventory.ValidateItem("Ru1022rb",function (res) {console.log(res);});

//Order
LipseysApi.Orders.Order({
    "PONumber": "PoNumber",
    "EmailConfirmation": true,
    "DisableEmail": true,
    "Items": [
        {
            "ItemNo": "RU1022RB",
            "Quantity": 1,
            "Note": "Note"
        }
    ]
},function (res) {console.log(res);});

//Allocation Order
LipseysApi.Orders.AllocationOrder({
    "PONumber": "PoNumber",
    "EmailConfirmation": true,
    "DisableEmail": true,
    "Items": [
        {
            "ItemNo": "RU1022RB",
            "Quantity": 1,
            "Note": "Note"
        }
    ]
},function (res) {console.log(res);});

//Drop Ship Accessories
LipseysApi.Orders.DropShipAccessories({
    "Warehouse": "",
    "PoNumber": "PO Number",
    "BillingName": "BillingName",
    "BillingAddressLine1": "1234 Street dr",
    "BillingAddressLine2": "Room 3",
    "BillingAddressCity": "Baton Rouge",
    "BillingAddressState": "LA",
    "BillingAddressZip": "70403",
    "ShippingName": "Shipping Name",
    "ShippingAddressLine1": "5678 Other st",
    "ShippingAddressLine2": "floor 2",
    "ShippingAddressCity": "Metarie",
    "ShippingAddressState": "LA",
    "ShippingAddressZip": "70001",
    "MessageForSalesExec": "Thanks",
    "DisableEmail": true,
    "Items": [
        {
            "ItemNo": "AD100042",
            "Quantity": 1,
            "Note": "hello"

        }
    ],
    "Overnight": false
},function (res) {console.log(res);});

//Drop Ship Firearms
LipseysApi.Orders.DropShipFirearms({
    "Ffl": '123123123123123',
    "Po": 'TEST',
    "DelayShipping": false,
    "DisableEmail": true,
    "Name": 'Customer NAme',
    "Phone": 'Customer Phone',
    'Items': [
        {
            "ItemNo": 'RU1022RB',
            "Quantity": 1,
            "Note": 'Note'
        }
    ]
},function (res) {console.log(res);});

//One Day Shipping Information
// the following is equivelant to 5 days ago: new Date(new Date() - (1000 * 60 * 60 * 24 * 5)
// 1000ms * 60s * 60minutes * 24hours * 5days
LipseysApi.Shipping.OneDayShipping(new Date(new Date() - (1000 * 60 * 60 * 24 * 5)),function (res) {console.log(res);});
