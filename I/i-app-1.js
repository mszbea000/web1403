let app = require('./G-http-2.js');
let fs = require('fs');

function write(res, body){
    res.write(JSON.stringify(body));
    res.end();
}

app.use('GET', '/test', function(request, response){
    console.log('test.')
});

app.use('GET', '/sum', sumController);
app.use('POST', '/sum', sumController);
function sumController(request, response){
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };

    write(response, result);
}

app.use('GET', '/multiply', function(request, response){
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
});

app.use('GET', '/printRecord', function(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
});

app.use('POST', '/file', function(request, response){
    fs.writeFile(request.data.name, request.data.content, function(err) {
        if (err) {
            console.log('FAILLLLL');
            write(response, { status: "FAIL"})
        }
        else{
            console.log('OKKKKKKKK');
            write(response, { status: "OK"})
        }
    }); 
});

app.use('POST', '/data', function(request, response){
    fs.readFile('./database.json', {encoding:'utf8'}, function(error, fileData){
        if(error){
            write(response, { status: "FAIL"});
        }
        else{
            let obj = JSON.parse(fileData);
            obj.records.push(request.data);
            let string = JSON.stringify(obj);
            fs.writeFile('./database.json', string, function(error2){
                if(error2){
                    write(response, { status: "FAIL"});
                }
                else {
                    write(response, { status: "OK"});
                }
            })
        }
    });  
});
app.use('GET', '/data', function(request, response){
    fs.readFile('./database.json', {encoding:'utf8'}, function(error, fileData){
        if(error){
            write(response, { status: "FAIL" });
        }
        else{
            write(response, JSON.parse(fileData));
        }
    });  
}); 
app.use('PUT','/data',function(request, response){
    let upData=request.data;
    fs.readFile("./database.json",'utf-8',function(err,data){
        if(err){
            console.log("error up",err);
        }else{
            let getData=JSON.parse(data.toString())
            getData.records.forEach(item=>{
                let find=false;
                if(item.id===upData.id){
                    item.content=upData.content
                    find=true;
                }
                if(find){
                    fs.writeFile("./database.json",JSON.stringify(getData),"utf-8",function(err){
                        if(err){
                            console.log(err);
                        }else{
                            response.write("complate update")
                            response.end()
                        }
                    })
                }
            })
        }
    })
})

app.use('GET', '/file', function(request, response){
    fs.readFile(request.path[2], {encoding:'utf8'}, function(error, fileData){
        if(error){
            write(response, { status: "FAIL" });
        }
        else{
            response.write(fileData)
        }
    });  
}); 
app.start();