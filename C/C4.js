let cmd=require('./C4-cmd');
let fs=require('fs');
cmd.use("sum",function(inputs){
    console.log(cmd.parseInput(inputs[1]) + cmd.parseInput(inputs[2]))
});
cmd.use("minus",function(inputs){
    console.log(cmd.parseInput(inputs[1]) - cmd.parseInput(inputs[2]))
});
cmd.use("multiply",function(inputs){
    console.log(cmd.parseInput(inputs[1]) * cmd.parseInput(inputs[2]))
});
cmd.use("division",function(inputs){
    console.log(cmd.parseInput(inputs[1]) / cmd.parseInput(inputs[2]))
});
cmd.use("print",function(inputs){
    console.log({
        name:inputs[1],
        family:inputs[2],
        age:inputs[3]
    })
});
cmd.use("save",function(inputs){
    let newObj={
        name:inputs[1],
        family:inputs[2],
        age:inputs[3]
    }
    fs.writeFile('myFile.txt',JSON.stringify(newObj),'utf8',function(err){
        if(err){
            console.log("ERROR:",err);
        }else{
            console.log("File Saved");
        }
    })
})
cmd.use("openFile",function(inputs){
    fs.readFile(inputs[1],"utf8",function(err,data){
        if(err){
            console.log("ERROR:",err);
        }else{
            console.log(data.toString());
        }
    })
})
cmd.use("open",function(inputs){
    fs.readFile(inputs[1],"utf8",function(err,data){
        if(err){
            if(err.code==="EISDIR"){
                fs.readdir(inputs[1],"utf8",function(error,datas){
                    if(error){
                        console.log("not Finded :(");
                    }else{
                        console.log("Files: ",datas);
                    }
                })
            }else{
                console.log(err);
            }    
        }else{
            console.log(data.toString());
        }
    })
})
cmd.start();