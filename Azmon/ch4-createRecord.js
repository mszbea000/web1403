let fs=require("fs")
let inputs=process.argv.slice(2)

fs.readFile("database.json","utf-8",function(err,data){
    if(err){
        console.log(err);
    }else{

        let newOBJ={
            name:inputs[0],
            family:inputs[1],
            email:inputs[2]
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



