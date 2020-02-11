const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const app2 = express();
const port = process.env.PORT || 5000;
const port2 = process.env.PORT || 8000;
const fs = require('fs');

var jwt = require('jsonwebtoken');

var db
var db2

app.use(cors());
app.use(bodyParser());
app.use(express.static('./Public'))

MongoClient.connect('mongodb+srv://Westongb:Abc123890@mature-masculinity-nteci.mongodb.net/Classes?retryWrites=true&w=majority',{ useUnifiedTopology: true },(err, client)=> {
    if (err) return console.log(err)
    db= client.db('ClassDirectory')
    collection = db.collection("Classes")
    console.log("Connected to" + collection)
    db2= client.db('ClassDirectory')
    collection = db2.collection("Students")
    console.log("Connected to" + collection)
    userDb = client.db('UserInfo');
    collection = userDb.collection('UserInfo');

// db.collection('Classes').find({}).toArray(function(err,res){
//     if (err) throw err
//     console.log(res)
// })


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split('');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatue(403)
    }
}

// jwt.sign({user}, 'secretkey', (err, token) => {
//     res.json({
//         token
//     })
// })

app.get("/classes/get", (req,res) =>{
    db.collection('Classes').find({}).toArray(
        function(err, data){
        if (err) {return err}
        else { 
    //   console.log(data)
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
      console.log(req.params.course);
    db2.collection('Students').find({"course":req.params.course}).toArray(
        function(err, data){
        if (err) {return console.log(err)}
        else { 
    //   console.log(data)
            res.json(data)
        }})   
})


app.get("/classes/:Campus", (req,res) =>{
    db.collection('Classes').find({"Campus": req.params.Campus}).toArray(
        function(err, data){
        if (err) {return err}
        else { 
    //   console.log(data)
            res.json(data)
        }})   
})

app.get("/students", (req,res) =>{
    db2.collection('Students').find({}).toArray(
        function(err, data){
        if (err) {return console.log(err)}
        else { 
    //   console.log(data)
            res.json(data)
        }})   
})


app.get("/students/search/:studentName", (req,res) =>{
    db2.collection('Students').find({studentName:req.params.studentName}).toArray(
        function(err, data){
        if (err) {return console.log(err)}
        else { 
    //   console.log(data)
            res.json(data)
        }})
})


app.post("/students/new", (req,res) => {
    console.log(req.body)
    db2.collection('Students').insertOne(req.body, (err, response) => {
       
        if (err) throw err;
        console.log(response)
        db2.collection('Students').find({}).toArray( (err,data) =>{
            if (err) {return err}
        else { 
    //   console.log(data)
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
})});


  app.post("/students/imageFileName", (req,res) => {
    if (!req.params.files || Object.keys(req.params.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let imageFile = req.files.imageFileName;
    
      // Use the mv() method to place the file somewhere on your server
      imageFile.mv('/Server/Public/filename.jpg', function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });
})

app.get('/Public/JohnDoe.png', (req,res) =>{
   
    //   console.log(data)
            
            res.sendFile('./Public/JohnDoe.png', { root: __dirname });
            
            console.log(res.params)
      
})





//user login info

app.get("/students/login/:userName", (req,res) =>{
    userDb.collection('UserInfo').find({userName:req.params.userName}).toArray(
        function(err, data){
        if (err) {return console.log(err)}
        else { 
    //   console.log(data)
            res.json(data)
        }})
})


    app.listen(5000, ()=> {
        console.log('listening on 5000')
    })
})



//app.locals.collection[name]