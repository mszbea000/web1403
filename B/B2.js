let inputs = process.argv.slice(2);
let command = inputs[0];

let controllers = [];

function parseInput(input){
    return parseInt(input);
}

function use(name, func){
    let x = {
        command: name,
        function: func
    };

    controllers.push(x);
}

use("minus", function(a, b){
    return a - b
});
use("sum", function(a, b){
    return a + b
});
use("multiply", function(a, b){
    return a * b
});

use("division",function(a,b){
    return a / b
})
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
