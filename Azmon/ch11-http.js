let http=require("http")
let controllers=[]
function use(method,name,func){
  let obj={
    method:method,
    name:name,
    funnction:func
  }
  controllers.push(obj)
}
function route(req, res){
    let found = false;
    for(let item of controllers){
        if(req.url.startsWith(item.name)&&req.method===item.method){
            item.funnction(req, res);
            found = true;
        }
           
        
    }
    if(!found){
        console.log('Path not found.');
        response.write("ERRRRRRRRRR");
        response.end();
    }
}
function start(){
    let server=http.createServer(function(req,res){
        req.path=req.url.split("/")
        let data = '';
        req.on('data', function(chunck){
            data = data + chunck;
        });
        req.on('end', function(chunck){
            try{
                req.data = JSON.parse(data);
            }
            catch(e){
                req.data = data;
            }
            console.log('request.data:', req.data);
            route(req, res);
        });
        
    })
    server.listen(80)
}

module.exports={
    use:use,
    start:start
}
