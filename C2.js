let cmd=require('./C/C2-cmd');
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
    for(let i = 1;i<inputs.length;i++){

        fs.appendFile('myFile.txt',inputs[i]+"\n",{encoding:'utf8'},function(error){
            if(error){
                console.log("ERROR: ",error);
            }else{
            console.log("File Saved");
            }
        })
    }
})


cmd.start();