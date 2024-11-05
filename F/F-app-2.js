let app = require('./F-http-2.js');
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



function write(response,result){
    response.write(JSON.stringify(result))
    response.end()
}
app.start();
