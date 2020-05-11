var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var dotenv = require('dotenv');
var Deal = require('./models/Deal');
var _ = require("underscore");
var fs = require('fs');
var DataUtil = require('./data-util')

var app = express();

const random = require('random')


var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load envirorment variables
dotenv.config();
console.log(process.env.MONGODB); 
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var date = DataUtil.generateDate()


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));



 /* Structure of deals.json {Price: Number, Tags: [String], Store: String, Rating: Number, Location(State): String} */

app.get('/',function(req,res){
  Deal.find({}, function(err, deals) {
    return res.render('home', { data: deals });
  });
})

app.get('/create', function(req, res) {
  Deal.find({}, function(err, deals) {
      return res.render('create', { deals: deals });
  });
});

app.get('/random', function(req, res) {
  var rand = random.int(min = 50, max = 200)
  Deal.find({price: {$gte: 50}}, function(err, deals) {
      return res.render('home', { deals: deals });
  });
});

app.post('/create', function(req, res) {
  var name = req.body.name 
  var price = req.body.price
  var tags = req.body.tags
  var store = req.body.store 
  var location = req.body.location 
  var rating = req.body.rating
  var comment = req.body.comment 


  var deal = new Deal({
    name: name,
    price: price,
    tags: tags,
    store: store,
    location: location,
    reviews: []
  });

  deal.reviews.push({
    rating: rating,
    comment: comment
  })
  
    deal.save(function(err) {
      if (err) throw err;
      io.emit('new deal', deal);
      return res.send('Done!');
  });
});

app.get('/men',function(req,res){
  Deal.find({tags:"men"}, function(err, deals) {
    return res.render('home', { data: deals });
});
})

app.get('/women',function(req,res){
  Deal.find({tags:"women"}, function(err, deals) {
    return res.render('home', { data: deals });
});
})

app.get('/maryland',function(req,res){
  Deal.find({location:"MD"}, function(err, deals) {
    return res.render('home', { data: deals });
  });
})

app.get('/budget',function(req,res){
  Deal.find({price: {$lte: 50}}, function(err, deals) {
    return res.render('home', { data: deals });
  });
})


app.get('/about',function(req,res){
  return res.render('about');
})

app.get('/feedback', function(req,res) {
  return res.render('feedback')
})

app.post('/feedback', function(req,res) {
  res.send("Feedback Submitted on " + date)
})

app.delete('/deleteID/:id', function(req, res) {
  Deal.findByIdAndRemove(req.params.id, function(err, deal) {
      if (err) throw err;

      if(!deal){return res.send('No deal with that id');}
      res.send('Deal deleted!');
  });
});

app.delete('/deleteLocation/:location', function(req, res) {
  Movie.deleteOne({location: req.params.location },function(err,deal){
      if (err) throw err;
      if (!deal) return res.send('No deal found with that location.');
      res.send('Random deal with given location deleted!')
  });
});



io.on('connection', function(socket) {
  console.log('NEW connection.');
});

io.on('connection', function(socket) {
  console.log('NEW connection.');
  socket.on('disconnect', function(){
      console.log('Oops. A user disconnected.');
  });
});
http.listen(3000, function() {
    console.log('Listening on port 3000!');
});

