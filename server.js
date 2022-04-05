const express = require('express')

const app = express()

app.use('/static', express.static('static'));

var count = 0
var time = 0 // 播放了多久了，单位是秒
const PAUSED = 0
const PLAYING = 1
var status = PLAYING // 0是暂停状态，1是播放状态

var clock = setInterval(() => { // 开始计时
    time++
}, 1000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

app.get('/getPlayInfo', function (req, res) {
    count++
    var response = {
        "time": time,
        "status": status,
        "count": count,
        "sysTime": (new Date()).getTime()
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.get('/pause', function (req, res) {
    if(clock){
        clearInterval(clock)
        clock = null
        status = PAUSED
        console.log('paused');
    } else{
        console.log('warning: already paused! ');
    }
    res.send('pause success')
})

app.get('/resume', function (req, res) {
    if(!clock){
        clock = setInterval(() => { // 开始计时
            time++
        }, 1000);
        status = PLAYING

        console.log('resumed');
    } else {
        console.log('warning: already playing! ');
    }
    res.send('resume success')
})

app.get('/pauseOrResume', function (req, res) {
    if(!clock){
        clock = setInterval(() => { // 开始计时
            time++
        }, 1000);
        status = PLAYING
        console.log('resumed');
    } else {
        clearInterval(clock)
        clock = null
        status = PAUSED
        console.log('paused');
    }
    res.send('success')
})

app.get('/forward', function (req, res) {
    time -= 300
    res.send('success')
})

app.get('/backward', function (req, res) {
    time += 300
    res.send('success')

})

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('listening port 5000');
})
