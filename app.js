const express = require('express')

const app = express()

app.get('/',function(req,res){
    var myDate = new Date()
    console.log(myDate.toLocaleDateString());
    res.send('hello node world,当前时间：'+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds()+'+'+myDate.getMilliseconds())
})

const server = app.listen(5000,function(){
    console.log('5000端口监听');
})