let cmd=require('./E-http-5-cmd')
let fs=require("fs")
let result
cmd.use('sum',function(path,res){
    result=+path[2] + +path[3] // +path[2] ===> parseInt(path[2])
    write(res,result)
})

cmd.use('mul',function(path,res){
    result=+path[2] * +path[3] // +path[2] ===> parseInt(path[2])
    write(res,result)
})

cmd.use('minus',function(path,res){
    result=+path[2] - +path[3] // +path[2] ===> parseInt(path[2])
    write(res,result)
})

cmd.use('division',function(path,res){
    result=+path[2] / +path[3] // +path[2] ===> parseInt(path[2])
    write(res,result)
})

cmd.use('print',function(path,res){
    let newOBJ={
        name:path[2],
        family:path[3],
        email:path[4]
    }
    result=JSON.stringify(newOBJ)
    write(res,result)
})

cmd.use('saveRecord',function(path,res){
    let newOBJ={
        name:path[3],
        family:path[4],
        email:path[5]
    }
    fs.writeFile(path[2],JSON.stringify(newOBJ),"utf8",function(err){
        if(err){
            result="ERROR: "+err
            write(res,result)
        }else{
            result="File Saved"
            write(res,result)
        }
    })
    
})

cmd.use("openFile",function(path,res){
    fs.readFile(path[2],"utf8",function(err,data){
        if(err){
            console.log(err);
            
        }else{
            result=data.toString()
            write(res,result)
        }
    })
})
cmd.use("saveOBJ",function(path,res){
    fs.readFile(path[2],"utf8",function(err,data){
        if(err){
            console.log("bbbbb",err);
            
        }else{            
            let getData=data.toString()
            getData=JSON.parse(getData)
            let newOBJ={
                name:path[3],
                family:path[4],
                email:path[5]
            }
            getData.data.push(newOBJ)
            fs.writeFile(path[2],JSON.stringify(getData),function(err){
                if(err){
                    console.log(err);
                    
                }else{
                    result="Save Change"
                    write(res,result)
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