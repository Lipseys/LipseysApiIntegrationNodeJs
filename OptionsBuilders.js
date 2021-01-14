const ApiUrl = "https://api.lipseys.com/api/";
const optionsBuilder = (model, path) => {

    var headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'};
    if(process.env.LIPSEYSPRESETURL){
        headers.PresetUrl = process.env.LIPSEYSPRESETURL;
    }

    return( { method: 'POST',
        url: ApiUrl + path,

        headers: headers,
        body: model,
        json: true });
};
const getOptionsBuilder = (model, path) => {


    var headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'};
    if(process.env.LIPSEYSPRESETURL){
        headers.PresetUrl = process.env.LIPSEYSPRESETURL;
    }
    return( { method: 'GET',
        url: ApiUrl + path,
        headers: headers,
        qs: model,
        json: true });
};

module.exports = {
    optionsBuilder: optionsBuilder,
    getOptionsBuilder: getOptionsBuilder
}
