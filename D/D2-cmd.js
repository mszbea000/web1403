let inputs = process.argv.slice(2); 
let commend=inputs[0];
let controllers=[];
let fs=require('fs');
function parseInput(input){
    if(isNaN(parseInt(input)) ){
        return input;
    }
    return parseInt(input);
}

function use(name,func){
    let x={
        name:name,
        func:func
    }
    controllers.push(x);
}

function start(){
    let found = false;
    controllers.forEach(function(item){
        if(commend===item.name){
            item.func(inputs)
            found=true;
        }
    })
    if(!found){
        console.log("wrong!!")
    }
}
function checkFile(){
    fs.readFile(inputs[1],"utf-8",function(err,data){
        if(err){
            if(err.code==="EISDIR"){}
        }else{
            let getData=data.toString()
            if(getData===""){
                fs.writeFile(inputs[1],{"data":[]},)
            }
        }
    })
}

module.exports={
    parseInput:parseInput,
    use:use,
    start:start,
    
}