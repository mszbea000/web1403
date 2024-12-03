let cmd=require('./ch11-http')
let fs=require("fs")


cmd.use("GET","/ch7",function(req,res){
    let inputs=req.url.split("/")
            res.write(inputs[2])
            res.end()
})
cmd.use("POST","/data",function(req,res){
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
})
cmd.use("DELETE","/data",function(req,res){
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
})



cmd.start()

