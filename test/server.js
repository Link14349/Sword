// 测试服务器文件
const express = require('express');
const path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get("/hi", (req, res) => {
    res.send("Hi! From '" + req.query.name + "', state " + req.query.state);
});
app.get("/info", (req, res) => {
    let {browser, name} = JSON.parse(req.query.info);
    res.send("Name '" + name + "', browser " + browser);
});
app.get(/\/files\/.+/, (req, res) => {
    let p = req.originalUrl.replace(/^\/files\//, "").replace(/(\/?)\.\.\.(\/?)/, "$1..$2");
    res.sendFile(path.join(__dirname, p));
});

app.listen(8080);