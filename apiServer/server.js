var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', function(req, res, next) {
  console.log('all *');
    setTimeout(function() {
        next();
    }, 3000); // 120 seconds
});

app.get("/api/hello", function(req, res) {
  console.log('/api/hello');
  res.json({message: "hello"});
});

app.listen(3001, function() {
  console.log("Listening on Port 3001");
});
