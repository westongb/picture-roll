import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "./Forms/StudentsModal";
import ClassModal from "./Forms/ClassModal";
import ClassRoster from "./StudentTable";
import "./Forms/Add_Class";

export default function Current() {

   

    useEffect(() => {
        getCourse({})
    },[]);

    useEffect(() => {
        getStudents({})
    },[]);

//get classs data
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

    
  //get Student data

    
//set up State
    const [selectedCourse, setSelectedCourse] = useState()

    const SelectedCourseContext = React.createContext(selectedCourse);

    const [classes, setClasses] = useState("");

    const [classRoster, setClassRoster] = useState('');
    
//set up variables for Classes deconstruction
    let course;
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
        
        course = className+classStartDate+classCampus;
      
        return(
    <option value={course}>{course}</option>
        )
    })
}   

let searchCourse = JSON.stringify(course);

function getStudentsByCourse(res){
    console.log(course)
   fetch('http://localhost:5000/students/'+selectedCourse, {
       method: "GET"
   })
   .then((res)=> { return res.json();
   })
   .then((res) =>{
       setClassRoster(res)
       return console.log(res)
   },
   // (error) => {
   //     setClasses("error")
   // }
   )
 }


 function getStudents(res){
    console.log(studentName);
   fetch('http://localhost:5000/students/search/'+studentName, {
       method: "GET"
   })
   .then((res)=> { return res.json();
   })
   .then((res) =>{
       setClassRoster(res)
       return console.log(res)
   },
   // (error) => {
   //     setClasses("error")
   // }
   )
 }

const [studentName, setStudentName] = useState()
 
const changeCourse = async(e) => {
    await setTimeout(setSelectedCourse(e.target.value),2000);
                }

const loadList = async (e) => {
    e.preventDefault();
    await setClassRoster("");
   await getStudentsByCourse();
   await setSelectedCourse("");
}       

const loadListStudent = async (e) => {
    e.preventDefault();
   await getStudents();
   
}       



//Select Class Drop Down

    return(
        <div>
            <div>
            <h1>Lets see if this works. </h1>
            <div>
            <form onSubmit={loadList} className="classForm">
            <label>Course</label> 
                    <select onChange={
                        changeCourse
                    }>
                        <option value="default">Select Class</option>
                        {classesList}
                     </select>
                     <button type="submit">Find</button>
                     <ClassModal/>
            </form>
           <form className="classForm" onSubmit={loadListStudent}>
                    <label>Student</label>
                    <input type="text" className="studentSearch" value={studentName} onChange={(e)=> setStudentName(e.target.value)}></input>
                    <button type="submit">Find</button>
                    <Modal/>
           </form>
            </div>
            
           
            </div>
            <br></br>
            <ClassRoster classList={classRoster}/>
        </div> 
    );
}


