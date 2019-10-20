
var get = function(url, state, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);

    console.log(state)
    if(typeof state.data.headers !== 'undefined'){
        for(var header of state.data.headers){
            xmlHttp.setRequestHeader(Object.keys(header)[0], header[Object.keys(header).pop()])
        }
    }
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4)
            callback(JSON.parse(xmlHttp.responseText), xmlHttp.status);
    }
    xmlHttp.send(null);
}

