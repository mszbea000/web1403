const { json } = require('stream/consumers');
let app = require('./G-http-1.js');
let fs = require('fs');
const { log } = require('console');
function write(res, body){
    res.write(JSON.stringify(body));
    res.end();
}

app.use('/test', function(request, response){
    console.log('test.')
});
app.use('/sum', function(request, response){
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };

    write(response, result);
});
app.use('/multiply', function(request, response){
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
});
app.use('/printRecord', function(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
});

app.use('/file', function(request, response){
    

    fs.writeFile(request.data.name, request.data.content, function(err) {
        if (err) {
            console.log('FAILLLLL')
            write(response, { status: "FAIL"})
        }
        else{
            console.log('OKKKKKKKK');
            write(response, { status: "OK"})
        }
    }); 
});

app.use('/data',function(request, response){
    let getData=""
    fs.readFile(request.data.name,"utf-8",function(err,data){
        if(err){
            console.log("ERROR:",err);
            write(response, { status: "ERROR!"+err})
        }else{
            getData=data.toString()
            getData=JSON.parse(getData)  
            getData.data.push(request.data.content)
            fs.writeFile(request.data.name,JSON.stringify(getData))
            write(response, { status: "complet :)"})
        }
        

    })
})
app.start();