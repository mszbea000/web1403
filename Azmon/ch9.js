let http=require("http")
let fs=require("fs")
let server=http.createServer(function(req,res){



    if(req.method==="DELETE"){
        if(req.url.startsWith("/data")){
            req.path=req.url.split("/")
            deleteUser(req,res)
        }else{
            res.write("Path Wrong!")
            res.end()
        }
    }else{
        res.write("Method not DELETE")
        res.end()
    }
})
server.listen(80)




function deleteUser(req,res){
    fs.readFile("database.json","utf-8",function(err,data){
        if(err){
            console.log(err);
        }else{
            let getdata=data.toString()
            getdata=JSON.parse(getdata)
            let x=0
            let find=false
            let newArray=[]
            getdata.records.filter(function(item){

                 if(item.name!==req.path[2]){
                     find=true
                     x++
                     newArray.push(item)
                 }
            })
            
            if(find){
                x=getdata.records.length-x
                console.log(getdata,x);
                getdata.records=newArray
                fs.writeFile("database.json",JSON.stringify(getdata),"utf-8",function(err){
                    if(err){
                        console.log("ERRORRRRR:",err);
                    }else{
                        res.write(`${x} Record Delete in database.`)
                        res.end()
                    }
                })
            }else{
                res.write("User not finded")
                res.end()
            }
        }
    })
}