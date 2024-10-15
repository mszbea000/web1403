let inputs=process.argv.slice(2);
function sum(a,b){
    return a+b;
}
function mul(a,b){
    return a*b;
}

let commands={
    "sum":sum,
    "mul":mul
}
console.log(commands[inputs[0]](+inputs[1],+inputs[2]))