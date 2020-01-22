const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodmon = require('nodemon');
const Directory = require('./Methods/StudentDirectory');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Westongb:Abc123890@mature-masculinity-nteci.mongodb.net/ClassDirectory?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { 
  console.log("Connected to Mongodb")

});



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get" , function(req, res){
  const docs = Directory.find({}, function(err,data){
    if (err) {
      return res.json({Message: 'this didnt work'})
    } else {
      res.json(data);
      console.log(data)
    }
  })
  console.log(docs)
});

app.listen(port, () => console.log(`Listening on port ${port}`));