const { json } = require('stream/consumers');
let app = require('./G-http-2.js');
let fs = require('fs');
let getData = ""
const { log } = require('console');
function write(res, body) {
    res.write(JSON.stringify(body));
    res.end();
}

app.use('/test', function (request, response) {
    console.log('test.')
});
app.use('/sum', function (request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };

    write(response, result);
});
app.use('/multiply', function (request, response) {
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
});
app.use('/printRecord', function (request, response) {
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
});

app.use('/file', function (request, response) {


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
});

app.use('POST', '/data', dataFunc)
app.use("GET", '/data', GETdataFunc)


app.use("PUT", '/data', updateFunc)

function updateFunc(request, response) {
    fs.readFile("dataBase.json", "utf-8", function (err, data) {
        if (err) {
            console.log("ERROR:", err);
            write(response, { status: "ERROR!" + err })
        } else {
            getData = JSON.parse(data)
            getData.data.forEach(function (item) {
                if (item.id === request.path[2]) {
                    item.content = request.data
                    fs.watchFile("dataBase.json", JSON.stringify(getData))
                } else {
                    console.log("id not finded");
                    write(response, { status: "id not finded" })
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

app.start();