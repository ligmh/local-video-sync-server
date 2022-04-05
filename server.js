const express = require('express')

const app = express()

app.use('/static', express.static('static'));

var count = 0
var time = 0 // 播放了多久了，单位是秒
var startTime = new Date().getTime()

var clock = setInterval(() => { // 开始计时
    time++
}, 1000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})


app.get('/pause', function (req, res) {
    clearInterval(clock)
    clock = null
    console.log('paused');
    res.send('pause success')
})

app.get('/resume', function (req, res) {
    clock = setInterval(() => { // 开始计时
        time++
    }, 1000);
    console.log('resumed');
    res.send('resume success')
})

app.get('/pauseOrResume', function (req, res) {
    if(!clock){
        clock = setInterval(() => { // 开始计时
            time++
        }, 1000);
        console.log('resumed');
    } else {
        clearInterval(clock)
        clock = null
        console.log('paused');
    }
    res.send('success')
})

app.get('/getPlayInfo', function (req, res) {
    count++
    var response = {
        "time": time,
        "count": count,
        "sysTime": (new Date()).getTime()
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.get('/forward', function (req, res) {
    startTime += 300000
    res.send('success')
})

app.get('/backward', function (req, res) {
    startTime -= 300000
    res.send('success')

})

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('listening port 5000');
})
