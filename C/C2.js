let cmd=require('./C2-cmd');
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


cmd.start();