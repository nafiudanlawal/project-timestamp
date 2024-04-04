// index.js
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

// Endpoint for date and timestamp
app.get("/api/:input", function (req, res) {
  let input = req.params.input;
  if(Number.parseInt(input) == input)
    input = Number.parseInt(input);
  let date = new Date(input);

  if(date.toJSON()){
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
    
  else{
    res.json({
      error: "Invalid Date"
    });
  }
});

app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
