// 测试服务器文件
const express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get("/get", (req, res) => {
    let {browser, name} = JSON.parse(req.query.info);
    res.send("Name '" + name + "', browser " + browser);
});
app.post("/post", (req, res) => {
    res.send("Name '" + req.body.name + "'");
});
app.get("/jsonp", (req, res) => {
    res.send("JSONP_CALLBACK(\"Name '" + req.query.name + "'\")");
});
app.get(/\/files\/.+/, (req, res) => {
    let p = req.originalUrl.replace(/^\/files\//, "").replace(/(\/?)\.\.\.(\/?)/, "$1..$2");
    res.sendFile(path.join(__dirname, p));
});

app.listen(8080);