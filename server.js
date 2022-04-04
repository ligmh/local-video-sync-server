const express = require('express')

const app = express()

var count = 0
var startTime = new Date().getTime()

app.get('/',function(req,res){
    count++
    var myDate = new Date()
    var res_string = 'count:'+count+', time: '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds()+'+'+myDate.getMilliseconds()
    var playTime = Math.ceil((myDate.getTime() - startTime)/1000) // 影片放映了多久
    var response = {
        "time":playTime,
        "test":'just for test',
        "sysInfo":res_string
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

const server = app.listen(process.env.PORT || 5000,function(){
    console.log('5000端口监听');
})
