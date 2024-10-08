
let inputs = process.argv.slice(2);
let command = inputs[0];

let controllers = [];
function use(name, func){
    let x = {
        command: name,
        function: func
    };

    controllers.push(x);
}
function parseInput(input){
    return parseInt(input);
}

function start(){
    let x=0;
    controllers.forEach(function(item){
        if(item.command === command){
            x++;
            console.log(item.function(parseInput(inputs[1]), parseInput(inputs[2])));
        }
        
    })
    
    if (x===0){
        console.log("wrong")
    }
}

module.exports = {
    use:use,
    start:start
}