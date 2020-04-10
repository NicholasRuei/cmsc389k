var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");
var fs = require('fs');
var DataUtil = require("./data-util");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var _DATA = DataUtil.loadData().deals;

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 /* Structure of deals.json {Price: Number, Tags: [String], Store: String, Rating: Number, Location(State): String} */

app.get('/',function(req,res){
  res.render('home',{data: _DATA});
})

app.get('/maryland',function(req,res){
  var result = []
  _DATA.forEach(function(deal) {
    if (deal["location"] == "MD") {
        result.push(deal)
    }
  })
  res.render('home',{data: result});
})

app.get('/men',function(req,res){
  var result = []
  _DATA.forEach(function(tag) {
    if (tag["tags"].includes("men")) {
        result.push(tag)
    }
  })
  res.render('home',{data: result});
})

app.get('/women',function(req,res){
  var result = []
  _DATA.forEach(function(tag) {
        if (tag["tags"].includes("women")) {
            result.push(tag)
        }
  })
  res.render('home',{data: result});
})

app.get('/rating',function(req,res){
  var result = []
  _DATA.forEach(function(rate) {
    if (rate["rating"] > 4) {
        result.push(rate)
    }
  })
  res.render('home', {data: result});
})


app.get('/budget',function(req,res){
  var result = []
  _DATA.forEach(function(price) {
    if (price["price"] < 30) {
        result.push(price)
    }
  })
  res.render('home',{data: result});
})

app.get("/create", function(req, res) {
  res.render('create');
});

app.post('/create', function(req, res) {
  var body = req.body
  var result = {}
  
  body.tags = body.tags.split(/,\s*/).toLowerCase()

  _DATA.push(body);
  DataUtil.saveData(_DATA);
  res.redirect("/");
});

app.get("/api/dealData", function(req,res) {
  res.send(_DATA);
});

app.post("/api/addDeal", function(req, res) {
  console.log(req.body)
  var body = req.body
  var result = {}
  
  body.tags = body.tags.split(/,\s*/)
  _DATA.push(body)

  DataUtil.saveData(_DATA); 
  res.send("success!")
});


app.listen(3000, function() {
    console.log('Listening on port 3000!');
});

