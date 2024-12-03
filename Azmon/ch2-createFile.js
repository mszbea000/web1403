let fs=require("fs")
let inputs=process.argv.slice(2)
fs.writeFile(inputs[0],inputs[1],"utf-8",function(err){
    if(err){
        console.log("ERROR",err);
    }else{
        console.log("File Created.")
    }   
})

