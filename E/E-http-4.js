let http = require('http');
let fs = require('fs');
let server = http.createServer(function(req, res){
    let path = req.url.split('/');
    let result
    if(path[1]==="sum"){
      result=  parseInt(path[2]) + parseInt(path[3]);
      return write(res,result)
    }else if(path[1]==="mul"){
        result=  parseInt(path[2]) * parseInt(path[3]);
        return write(res,result)
    }else if(path[1]==="print"){
        let newOBJ={
            name:path[2],
            family:path[3],
            emaile:path[4]
        }
        result=JSON.stringify(newOBJ)
        return write(res,result)
    }else if(path[1]==="saveRecord"){
        let newOBJ={
            name:path[3],
            family:path[4],
            emaile:path[5]
        }
        fs.writeFile(path[2],JSON.stringify(newOBJ),"utf8",function(err){
            if(err){
                result="ERROR: ",err
            }else{
                result="File saved"
                return write(res,result)
            }
        })
    }else{
        result="wrrong!"
    }

    //write(res,result)
});

function write(res,result){
    if(typeof result==="number"){
        result.toString()
    }
    res.write("<h1>"+result+"</h1>");
    res.end();
}

server.listen(80);