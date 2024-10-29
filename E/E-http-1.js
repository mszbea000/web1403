let http = require('http');
let server = http.createServer(function(req, res){
    let path = req.url.split('/');
    let result
    if(path[1]==="sum"){
      result=  parseInt(path[2]) + parseInt(path[3]);
    }else if(path[1]==="mul"){
        result=  parseInt(path[2]) * parseInt(path[3]);
    }else{
        result="wrrong!"
    }

    res.write("<h1>"+result.toString()+"</h1>");
    res.end();
});
server.listen(80);