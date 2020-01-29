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
)
    }

 const submitHandle =(e) => {
    e.preventDefault();
     postStudent(e);
 }


    function postStudent(res){
        fetch("http://localhost:5000/students/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                studentName: studentName,
                course: studentCourse,
                studentSurvey: studentSurvey
            })
            
        }).then(
            res=> console.log("this Worked")
        )
    }

    const [classes, setClasses] = useState("")
    let Course;
    let courseList;
    let classesList;
    let classCampus;
    let classStartDate;
    let className;
    let courseText;


    //deconstruct Get

 

if(classes != "") {
  
    classesList = classes.map( (item,i) => {
        let itemIdex = item[i];
        className = item.ClassName;
        classStartDate = item.StartDate;
        classCampus = item.Campus;
        
        Course = className+classStartDate+classCampus;
       
        return(
    
    <option value={Course}>{Course}</option>
    
        )
    })
}   

const [studentSurvey, setStudentSurvey] = useState("");
const [studentName, setStudentName] = useState("");
const [studentCourse, setStudentCourse] = useState("");


let studentData = {
    "Student_Name": studentName,
    "Student_Course": studentCourse,
    "Student_Survey": studentSurvey
}


    

    return(
        <div>
            <h1>Add A New Student</h1>
            <form onSubmit={submitHandle}>
            <label>Student Picture</label>
                <input type="file"></input>
                <br></br>
                <label>Student Name</label>
                <input type="text" value={studentName} onChange={(e)=>{setStudentName(e.target.value)}}/>
                <br></br>
                <label>Course</label>
                    <select options={Course} value={studentCourse} onChange={(e)=> {setStudentCourse(e.target.value)}}>
                        <option>Select Course</option>
                        {classesList}
                    </select>
                <br></br>
                <label>New Student Survey</label>
                <input type="text" value={studentSurvey} onChange={(e)=>{setStudentSurvey(e.target.value)}}/> 
                <br></br>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
