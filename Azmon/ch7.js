let http=require("http")
let server=http.createServer(function(req,res){
    if(req.method==="GET"){
        if(req.url.startsWith("/ch7")){
            let inputs=req.url.split("/")
            res.write(inputs[2])
            res.end()
        }else{
            res.write("Path Wrong!")
            res.end()
        }
    }else{
        res.write("Method not GET")
        res.end()
    }
})
server.listen(80)

