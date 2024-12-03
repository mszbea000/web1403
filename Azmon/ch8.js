let http=require("http")
let fs=require("fs")
let server=http.createServer(function(req,res){



    if(req.method==="POST"){
        if(req.url.startsWith("/data")){
            let data=""
            req.on("data",function(chanck){
                data+=chanck
            })
            req.on("data",function(){
                try{
                    req.data = JSON.parse(data);
                }
                catch(e){
                    req.data = data;
                }
            })
            addUser(req,res)
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

function addUser(req,res){
    fs.readFile("database.json","utf-8",function(err,data){
        if(err){
            console.log(err);
        }else{
            let getdata=data.toString()
            getdata=JSON.parse(getdata)
            let newOBJ={
                name:req.data.name,
                family:req.data.family,
                age:req.data.age
            }
            getdata.records.push(newOBJ)
            fs.writeFile("database.json",JSON.stringify(getdata),"utf-8",function(err){
                if(err){
                    console.log("ERRORRRRR:",err);
                }else{
                    res.write("Record created in database.")
                    res.end()
                }
            })
        }
    })
}