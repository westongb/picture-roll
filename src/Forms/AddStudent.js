import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Add_Class.css';
import { PromiseProvider } from "mongoose";

export default function AddStudent() {

    useEffect(() => {
        getCourse({})
       
    },[]);

    function getCourse(res){
        fetch("http://localhost:5000/classes/get", {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setClasses(res)
            return console.log(res)
        },
        // (error) => {
        //     setClasses("error")
        // }
        )
    }

    

    const [classes, setClasses] = useState("")
    
    let Course;
    let courseList;
    let classesList;

    //deconstruct Get

if(classes != "") {
    let classesList = classes.map( function(item,i){
        let itemIdex = item[i];
        let className = item.ClassName;
        let classStartDate =  item.StartDate;
        let classCampus = item.Campus;
        let Course = className + classStartDate + classCampus;

        return(
    <div>
    <option value="Course">{}</option>
    </div>
        )
    })
}

// function myFunction(){
//     var x = document.getElementById("myFile");
//     var txt = "";
//     if ('files' in x) {
//       if (x.files.length == 0) {
//         txt = "Select one or more files.";
//       } else {
//         for (var i = 0; i < x.files.length; i++) {
//           txt += "<br><strong>" + (i+1) + ". file</strong><br>";
//           var file = x.files[i];
//           if ('name' in file) {
//             txt += "name: " + file.name + "<br>";
//           }
//           if ('size' in file) {
//             txt += "size: " + file.size + " bytes <br>";
//           }
//         }
//       }
//     } 
//     else {
//       if (x.value == "") {
//         txt += "Select one or more files.";
//       } else {
//         txt += "The files property is not supported by your browser!";
//         txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
//       }
//     }
//     document.getElementById("demo").innerHTML = txt;
//   }


console.log(classes)
    // console.log(classses)

    return(
        <div>
            <h1>Add A New Student</h1>
            <form>
            <label>Student Picture</label>
                <input type="file"></input>
                <br></br>
                <label>Student Name</label>
                <input type="text"></input>
                <br></br>
                <label>Course</label>
                    <select>{classesList}</select>
                <br></br>
                <label>New Student Survey</label>
                <input type="text"></input>
                <br></br>
            </form>
        </div>
    );
}
