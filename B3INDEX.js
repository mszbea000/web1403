let ortherFile=require('./B3CMD.js');

ortherFile.use("minus", function(a, b){
    return a - b
});
ortherFile.use("sum", function(a, b){
    return a + b
});
ortherFile.use("multiply", function(a, b){
    return a * b
});

ortherFile.use("division",function(a,b){
    return a / b
})

ortherFile.start()


 

