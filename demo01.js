var express = require('express')

var app = express()

app.get('/test',function(req,res){
    // console.log(req.get());
    res.cookie('gaga','1232312312312313',{
        // expires:'Session'
    })
    res.send(">>>"+req.query+"<<<")
})

var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port
    // console.log(host);
    console.log(port);
})