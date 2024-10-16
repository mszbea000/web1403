let inputs = process.argv.slice(2); 
let commend=inputs[0];
let controllers=[];

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

module.exports={
    parseInput:parseInput,
    use:use,
    start:start,
    
}