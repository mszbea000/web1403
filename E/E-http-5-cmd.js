let http=require("http")
let fs=require("fs")
let path
let command
checkFile()
let server =http.createServer(function(req,res){
    path=req.url.split("/")
    command=path[1]
    
    start(res)
})
server.listen(80)

let controllers=[]

function use(name,func){
    let controlObject={
        name:name,
        func:func
    }
    controllers.push(controlObject)
}

function checkFile(){
    fs.readFile("data.txt","utf8",function(err,data){
        if(err){
            if(err.code==="ENOENT"){
                fs.writeFile("data.txt",JSON.stringify({data:[]}),"utf8",function(err){
                    if(err){
                        console.log("ERROR: ",err);
                        
                    }else{
                        console.log("created");
                        
                    }
                })
            }
        }
    })
}

function start(res){
    
    let found=false
    controllers.forEach(function(item){
        if(command===item.name){
            found=true
            item.func(path,res)
        }
    })
    if(!found){
        res.write("Wrrong!!")
        res.end() 
    }
}
module.exports={
    start:start,
    use:use,
    
}