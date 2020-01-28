const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const app2 = express();
const port = process.env.PORT || 5000;
const port2 = process.env.PORT || 8000;

var db
var db2

app.use(cors());
app.use(bodyParser());

MongoClient.connect('mongodb+srv://Westongb:Abc123890@mature-masculinity-nteci.mongodb.net/Classes?retryWrites=true&w=majority',{ useUnifiedTopology: true },(err, client)=> {
    if (err) return console.log(err)
    db= client.db('ClassDirectory')
    collection = db.collection("Classes")
    console.log("Connected to" + collection)
    db2= client.db('ClassDirectory')
    collection = db2.collection("Students")
    console.log("Connected to" + collection)

// db.collection('Classes').find({}).toArray(function(err,res){
//     if (err) throw err
//     console.log(res)
// })


app.get("/classes/get", (req,res) =>{
    db.collection('Classes').find({}).toArray(
        function(err, data){
        if (err) {return err}
        else { 
      console.log(data)
            res.json(data)
        }})   
})

app.post("/classes/post", (req,res) => {
    console.log(req.body)
    db.collection('Classes').insertOne(req.body, (err, response) => {
       
        if (err) throw err;
        console.log(response)
        db.collection('Classes').find({}).toArray( (err,data) =>{
            if (err) {return err}
        else { 
      console.log(data)
            res.json(data)
        }})   
    } )

})



app.delete("/classes/delete/:_id", (req, res) => {
   var id= req.params._id;
   console.log(id);
db.collection('Classes').deleteOne({"_id":req.params._id}
    , (err, response) => {
    if (err) throw err;
    db.collection('Classes').find({}).toArray( (err,data) =>{
        if (err) {return err}
    else { 
  console.log(data)
        res.json(data)
    }})  
}
)
  });

  app.get("/students/:course", (req,res) =>{
    db2.collection('Students').find({"Course":req.params.course}).toArray(
        function(err, data){
        if (err) {return console.log(err)}
        else { 
      console.log(data)
            res.json(data)
        }})   
})

app.post("/students/post", (req,res) => {
    console.log(req.body)
    db2.collection('Students').insertOne(req.body, (err, response) => {
       
        if (err) throw err;
        console.log(response)
        db2.collection('Students').find({}).toArray( (err,data) =>{
            if (err) {return err}
        else { 
      console.log(data)
            res.json(data)
        }})   
    } )

})

app.delete("/students/delete/:_id", (req, res) => {
   var id= req.params._id;
   console.log(id);
db2.collection('Students').deleteOne({"_id":req.params._id}
    , (err, response) => {
    if (err) throw err;
    db2.collection('Students').find({}).toArray( (err,data) =>{
        if (err) {return err}
    else { 
  console.log(data)
        res.json(data)
    }})  
}
)
  });



    app.listen(5000, ()=> {
        console.log('listening on 5000')
    })
})



//app.locals.collection[name]