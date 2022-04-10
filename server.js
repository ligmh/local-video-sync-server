const express = require('express')

const app = express()

app.use('/static', express.static('static'));

var count = 0
var time = 0 // 播放了多久了，单位是秒
const PAUSED = 0
const PLAYING = 1
var status = PLAYING // 0是暂停状态，1是播放状态

function ticToc(){
    time++
}

var interval1 = setInterval(ticToc, 1000);

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
    if(interval1){
        time++
        clearInterval(interval1)
        interval1 = null
        status = PAUSED
        console.log('paused');
    } else{
        console.log('warning: already paused! ');
    }
    res.send('pause success')
})

app.get('/resume', function (req, res) {
    if(!interval1){
        interval1 = setInterval(ticToc, 1000);
        status = PLAYING
        console.log('resumed');
    } else {
        console.log('warning: already playing! ');
    }
    res.send('resume success')
})

app.get('/pauseOrResume', function (req, res) {
    if(!interval1){
        time++
        interval1 = setInterval(ticToc, 1000);
        status = PLAYING
        console.log('resumed');
    } else {
        clearInterval(interval1)
        interval1 = null
        status = PAUSED
        console.log('paused');
    }
    res.send('pauseOrResume success')
})

app.get('/forward/:gap', function (req, res) {
    time -= req.params.gap
    res.send('forward success')
})

app.get('/backward/:gap', function (req, res) {
    time -= -req.params.gap
    res.send('backward success')
})

app.get('/locateAt/:time', function (req, res) {
    time = Number.parseInt(req.params.time)
    res.send('locating success')
})

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('listening port 5000');
})
