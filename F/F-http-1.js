let http = require('http');
let controllers = [];

function use(asghar, func){
    let x = {
        url: asghar,
        function: func
    };
    controllers.push(x);
}

function route(request, response){
    let found = false;
    for(let item of controllers){
        //if(item.url === request.url){
        if(request.url.startsWith(item.url)){
            item.function(request, response);
            found = true;
        }
    }
    if(!found){
        console.log('Path not found.');
    }
}

function start(){
    console.log('start')
    let server = http.createServer(function(request, response){
        console.log(request.method, request.url);
        route(request, response);
    });
    server.listen(80);
}

module.exports = {
    use: use,
    start: start
}