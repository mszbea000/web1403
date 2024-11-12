const { json } = require('stream/consumers');
let app = require('./G-http-2.js');
let fs = require('fs');
let getData = ""
const { log } = require('console');
const { request } = require('http');
function write(res, body) {
    res.write(JSON.stringify(body));
    res.end();
}

app.use('/test', function (request, response) {
    console.log('test.')
});
app.use("POST",'/sum', sum);
app.use("POST",'/multiply', multiply);
app.use("GET",'/sum', sum);
app.use("GET",'/multiply', multiply);
app.use("POST",'/printRecord', printRecord);
app.use("POST",'/file', file);
app.use('POST', '/data', dataFunc)
app.use("GET", '/data', GETdataFunc)
app.use("PUT", '/data', updateFunc)
app.use("DELETE", '/data', deleteFunc)
function sum(request, response){
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };

    write(response, result);
}
function multiply(request, response){
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
}
function printRecord(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
}
function file(request, response){
    fs.writeFile(request.data.name, request.data.content, function (err) {
        if (err) {
            console.log('FAILLLLL')
            write(response, { status: "FAIL" })
        }
        else {
            console.log('OKKKKKKKK');
            write(response, { status: "OK" })
        }
    });
}
function updateFunc(request, response) {
    fs.readFile("dataBase.json", "utf-8", function (err, data) {
        if (err) {
            console.log("ERROR:", err);
            write(response, { status: "ERROR!" + err })
        } else {
            
            
            getData = JSON.parse(data)
            console.log(request.path[2]);
            console.log(getData);
            
            getData.records.forEach(function (item) {
                if (item.id === +request.path[2]) {
                    console.log(item);
                    item.content = request.data
                    fs.writeFile("dataBase.json", JSON.stringify(getData),"utf-8",function(err){
                        if(err){
                            console.log("ERROR:", err);
                            write(response, { status: "ERROR!" + err })
                        }else{
                            console.log("Updayt complite");
                            write(response, { status: "Updayt complite" })
                        }
                    })
                }
                
            })
        }
    })
}
function GETdataFunc(request, response) {
    fs.readFile("dataBase.txt", "utf-8", function (err, data) {
        if (err) {
            console.log("ERROR:", err);
            write(response, { status: "ERROR!" + err })
        } else {
            write(response, JSON.parse(data))
        }
    })
}
function dataFunc(request, response) {

    fs.readFile(request.data.name, "utf-8", function (err, data) {
        if (err) {
            console.log("ERROR:", err);
            write(response, { status: "ERROR!" + err })
        } else {
            if (request.method === "POST") {

                getData = data.toString()
                getData = JSON.parse(getData)
                getData.data.push(request.data.content)
                fs.writeFile(request.data.name, JSON.stringify(getData), function (err2) {
                    if (err2) {
                        write(response, { status: "ERROR!" + err })
                    } else {

                        write(response, { status: "complet :)" })
                    }
                })
            } else {
                write(response, { status: "please just Post Method" })

            }
        }


    })
}
function deleteFunc(request, response){
    fs.readFile("dataBase.json","utf-8",function(err,data){
        if(err){
            console.log("ERROR:", err);
            write(response, { status: "ERROR!" + err })
        }else{
            getData=JSON.parse(data)
            getData.records.forEach(function(item){
                if(item.id === +request.path[2]){
                    item.content=""
                    fs.writeFile("dataBase.json",JSON.stringify(getData),"utf-8",function(err){
                        if(err){
                            console.log("ERROR:", err);
                            write(response, { status: "ERROR!" + err })
                        }else{
                            console.log("Updayt complite");
                            write(response, { status: "Delete Record" })
                        }
                        
                    })
                }
            })
        }
    })
}
app.start();