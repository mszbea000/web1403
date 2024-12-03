let http=require("http")
let server=http.createServer(function(req,res){
    console.log("request received.");
})
server.listen(80)

