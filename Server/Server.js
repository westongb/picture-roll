require('dotenv').config({path:'../.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const AWS = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
const bcrypt = require('bcrypt')
const { check, validationResult} = require("express-validator/check");
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const upload = multer();


var db
var db2

app.use(upload.array()); 
app.use(fileUpload({
    createParentPath: true
}));
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
    userDb = client.db('ClassDirectory');
    collection = userDb.collection('UserInfo');

// db.collection('Classes').find({}).toArray(function(err,res){
//     if (err) throw err
//     console.log(res)
// })




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
    // console.log(req.body)
    db.collection('Classes').insertOne(req.body, (err, response) => {
       
        if (err) throw err;
        // console.log(response)
        db.collection('Classes').find({}).toArray( (err,data) =>{
            if (err) {return err}
        else { 
    //   console.log(data)
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
//   console.log(data)
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

app.get("/classes/:Campus/:StartDate", (req,res) =>{
    db.collection('Classes').find({
        "Campus": req.params.Campus,
        "StartDate": req.params.StartDate
}).toArray(
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
    // console.log(req.body)
    db2.collection('Students').insertOne(req.body, (err, response) => {
       
        if (err) throw err;
        // console.log(response)
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
//   console.log(data)
        res.json(data)
    }})  
})});


app.get('/Public/JohnDoe.png', (req,res) =>{
   
    //   console.log(data)
            
            res.sendFile('./Public/JohnDoe.png', { root: __dirname });
            
            // console.log(res.params)
      
})

app.post("/UserInfo/new", async (req,res) => {
    // console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    console.log(hashedPassword);
    const user = { FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        EmailAddress: req.body.EmailAddress,
        UserName: req.body.UserName,
        Password: hashedPassword}
    await userDb.collection('UserInfo').insertOne(
        user, (err, response) => {
       
        if (err) throw err;
        // console.log(response)
        db2.collection('UserInfo').find({}).toArray( (err,data) =>{
            if (err) {return err}
        else { 
    //   console.log(data)
            res.json(data)
        }})   
    } )

})




//user login info

app.get("/students/login/:userName", (req,res) =>{
    userDb.collection('UserInfo').find({UserName:req.params.userName}).toArray(
        function(err, data){
        if (err) {return console.log(err)}
        else { 
    //   console.log(data)
            res.json(data)
        }})
})


//user authentication

app.post('/login/:userName', async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
    //find user   
    let user = await userDb.collection('UserInfo').find({"UserName": req.params.userName}).next(
         async function  (err, user) {
           
        if (!err) {
            //compare passwords using bcrypt
            await bcrypt.compare(req.body.password, user.Password, function (err, result) {
                if (result === true) {
                   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '36000s'})
                  res.send({'TokenAuth': accessToken})
                } else {
                    res.send('Incorrect password');
        
                }});
        } else {
                console.log(err)
        }
    })
    } catch (errors) {
        console.error(errors);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

//verify token

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(" ")[1]
   if (token == null) return res.sendStatus(401)

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) return res.sendStatus(403)
       req.user = user
       next()
   })
}

//delete Token by logout

app.delete('/logout', (req,res) => {
    token
})


//image upload routs and formula

const BUCKET_NAME = "helio-student-photos";
const IAM_USER_KEY = "trial" ;
const IAM_USER_SECRET= "trial" ;

const s3 = new AWS.S3({
	accessKeyId: 'AKIAW6RK5BRDDCXWLZ7S',
	secretAccessKey: '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',
	Bucket: 'helio-student-photos'
});


app.get( '/sign-s3', ( req, res ) => {
    const { fileName, fileType } = req.query;
            const s3Params = {
                Bucket: "helio-student-photos",
                Key: fileName,
                ContentType: jpg,
            };
            s3.getSignedUrl('putObject', s3Params, (err, data) => {
                if (err) {
                  console.error(err);
                } else {
                  res.json({
                    signedRequest: data,
                    url: `https://helio-student-photos.s3-us-west-1.amazonaws.com/${fileName}`
         });
        }
     });
})



app.post ('/imgupload', (req, res) => {
    try {
    if (req.body.file === undefined) 
       { let s3bucket = new AWS.S3({
            accessKeyId: 'AKIAW6RK5BRDDCXWLZ7S',
            secretAccessKey: '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',
            Bucket: 'helio-student-photos'
        });
            s3bucket.upload(req.body.files, function (err, data) {
            
                if (err) {
                console.log('error in callback');
                console.log(err);
                }
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size
                    }
                });
            });} else {
                console.log('no data')
                res.send({
                    status: false,
                    message: 'No Files Uploaded'
                })
            };


// module.exports = (app) => {
//   // The following is an example of making file upload with additional body
//   // parameters.
//   // To make a call with PostMan
//   // Don't put any headers (content-type)
//   // Under body:
//   // check form-data
//   // Put the body with "element1": "test", "element2": image file

//   app.post('/api/upload', function (req, res, next) {
//     // This grabs the additional parameters so in this case passing in
//     // "element1" with a value.
//     const element1 = req.body.element1;

//     // var busboy = new Busboy({ headers: req.headers });

//     // // The file upload has completed
//     // busboy.on('finish', function() {
//     //   console.log('Upload finished');
      
//     //   // Your files are stored in req.files. In this case,
//     //   // you only have one and it's req.files.element2:
//     //   // This returns:
//     //   // {
//     //   //    element2: {
//     //   //      data: ...contents of the file...,
//     //   //      name: 'Example.jpg',
//     //   //      encoding: '7bit',
//     //   //      mimetype: 'image/png',
//     //   //      truncated: false,
//     //   //      size: 959480
//     //   //    }
//     //   // }
      
//     //   // Grabs your file object from the request.
//     //   const file = req.files.element2;
//     //   console.log(file);
      
//     //   // Begins the upload to the AWS S3
//     //   uploadToS3(file);
//     // });

//     // req.pipe(busboy);
//   });
// }

}catch (err) {
    res.status(500).send(err);
    console.log('caught the error')
}
})
    app.listen(5000, ()=> {
        console.log('listening on 5000')
    });
})