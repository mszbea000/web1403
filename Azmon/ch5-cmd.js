let inputs=process.argv.slice(2)
let commend =inputs[0]

let controllers=[]
function use(name,func){
  let obj={
    name:name,
    funnction:func
  }
  controllers.push(obj)
}
function start(){
    controllers.forEach(function(item){
        if(commend===item.name){
            item.funnction(inputs)
        }
    })
}

module.exports={
    use:use,
    start:start
}



