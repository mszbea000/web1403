let app = require('./F-http-3.js');
let fs=require('fs')
app.use('/test', function(request, response){
    console.log('test.')
});
app.use('/sum', function(request, response){
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    console.log(result.data);
    write(response, result);
});
app.use('/mul', function(request, response){
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    console.log(result.data);
    write(response, result);
});
app.use('/minuse', function(request, response){
    result = {
        data: parseInt(request.path[2]) - parseInt(request.path[3])
    };
    console.log(result.data);
    write(response, result);
});
app.use('/division', function(request, response){
    result = {
        data: parseInt(request.path[2]) / parseInt(request.path[3])
    };
    console.log(result.data);
    write(response, result);
});
app.use('/print',function(request, response){
    console.log(request.path);
    let newOBJ={
        name:request.path[2],
        family:request.path[3],
        email:request.path[4]
    }
    result={
       data:[newOBJ]
    }
    result=JSON.stringify(result)
    write(response, result);
})
app.use('/saveRecord',function(request, response){
    let newOBJ={
        name:request.path[3],
        family:request.path[4],
        email:request.path[5]
    }
    console.log(request.path);
    fs.writeFile("data.txt",JSON.stringify(newOBJ),"utf8",function(err){
        if(err){
            result="ERROR: "+err
            write(response,result)
        }else{
            result="File Saved"
            write(response,result)
        }
    })
    
})
app.use("/openFile",function(request, response){
    fs.readFile(request.path[2],"utf8",function(err,data){
        if(err){
            console.log(err);
            
        }else{
            result=data.toString()
            write(response,result)
        }
    })
})

app.use("/saveOBJ",function(request, response){
    fs.readFile(request.path[2],"utf8",function(err,data){
        if(err){
            console.log("bbbbb",err);
            
        }else{            
            let getData=data.toString()
            getData=JSON.parse(getData)
            let newOBJ={
                name:request.path[3],
                family:request.path[4],
                email:request.path[5]
            }
            getData.data.push(newOBJ)
            fs.writeFile(request.path[2],JSON.stringify(getData),function(err){
                if(err){
                    console.log(err);
                    
                }else{
                    result="Save Change"
                    write(response,result)
                }
            })
            
        }
    })
})

function write(res,result){
    if(typeof result==="number"){
        result=result.toString()
    }
    res.write(result)
    res.end()
    
}
app.start();
