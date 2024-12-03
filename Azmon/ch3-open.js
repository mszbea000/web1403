let fs=require("fs")
let inputs=process.argv.slice(2)

fs.readFile(inputs[0],"utf-8",function(err,data){
    if(err){
        console.log(err);
        if(err.code==="EISDIR"){
            fs.readdir(inputs[0],"utf-8",function(err,dataFolder){
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



