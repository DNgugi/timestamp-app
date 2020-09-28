// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Endpoint for empty request
app.get("/api/timestamp", function(req, res){
  let currentDate = new Date();
res.json(
  {
    "unix": currentDate.getTime(),
    "utc": currentDate.toUTCString()
  }
);

});

//Endpoint with request
app.get("/api/timestamp/:date_string", function(req, res){
  let dateRequested = req.params.date_string;
  let valuePassedIn = new Date(dateRequested);
  let unixValuePassedIn = new Date(parseInt(dateRequested));


  if (valuePassedIn === "Invalid Date" || unixValuePassedIn ==="Invalid Date"){
    res.json({"error" : "Invalid Date" });
  } else if (parseInt(dateRequested) > 10000){
    res.json({
      "unix": unixValuePassedIn.getTime(),
      "utc": unixValuePassedIn.toUTCString()
    });
  } else {
    res.json({
      "unix": valuePassedIn.getTime(),
      "utc": valuePassedIn.toUTCString()
    });
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
