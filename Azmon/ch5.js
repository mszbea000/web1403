let fs=require("fs")
let inputs=process.argv.slice(2)
let commend =inputs[0]
if(commend==="createFile"){
    fs.writeFile(inputs[1],inputs[2],"utf-8",function(err){
        if(err){
            console.log("ERROR",err);
        }else{
            console.log("File Created.")
        }   
    })
}else if(commend==="open"){
    fs.readFile(inputs[1],"utf-8",function(err,data){
        if(err){
            console.log(err);
            if(err.code==="EISDIR"){
                fs.readdir(inputs[1],"utf-8",function(err,dataFolder){
                    if(err){
                        console.log("ERROR 2",err);
                    }else{
                        console.log("Folder Content :",dataFolder);
                    }
                })
            }
        }else{
            console.log(data);
        }
    })
}else if(commend==="createRecord"){
    fs.readFile("database.json","utf-8",function(err,data){
        if(err){
            console.log(err);
        }else{
    
            let newOBJ={
                name:inputs[1],
                family:inputs[2],
                email:inputs[3]
            }
            let getData=data.toString()
            getData=JSON.parse(getData)
            getData.records.push(newOBJ)
            fs.writeFile("database.json",JSON.stringify(getData),"utf-8",function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Record created in database.");
                }
            })
        }
    })
}




