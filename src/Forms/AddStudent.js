import React, { useState, useEffect } from "react";
import './Add_Class.css';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import DropZone from 'react-drop-zone';



export default function AddStudent() {

    useEffect(() => {
        getCourse({});
        // getSignedRequest();
       
    },[]);

// set up state
const [studentSurvey, setStudentSurvey] = useState("");
const [studentName, setStudentName] = useState("");
const [studentCourse, setStudentCourse] = useState("");
const [classes, setClasses] = useState("");
const [selectedFile, setSelectedFile] = useState(null);


//form data format and fetch
    const formData= new FormData();
   
   
    formData.append('filename', selectedFile)
    
    var formEntries = Array.from(formData.entries());
    console.log("formEntries " , formEntries); 
    
  
    function submitFile (res, req) {
        fetch('http://localhost:5000/imgupload',{
            method:'Post',
            headers: {
                'Content-Type': `multipart/form-data`
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })
      }
    
    function getCourse(res){
        fetch("http://localhost:5000/classes/get", {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setClasses(res)
            // return console.log(res)
        },
)
    }

 const submitHandle = async(e) => {
    e.preventDefault();
    await postStudent(e);
    await submitFile(e);
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

    
// function getSignedRequest(selectedFile) {
//     return fetch(`/sign-s3`,{
//         method: "GET"
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`${response.status}: ${response.statusText}`);
//         }
//         return response.json();
//       });
//   }

//define Variables for Deconstruction

let Course;
let courseList;
let classesList;
let classCampus;
let classStartDate;
let className;
let courseText;



let studentData = {
    "Student_Name": studentName,
    "Student_Course": studentCourse,
    "Student_Survey": studentSurvey
}

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

    let studentFileName;

    if(selectedFile != null){
    studentFileName = selectedFile.name}

  

    return(
        <div>
            <h1>Add A New Student</h1>
            <form onSubmit={submitHandle}>
            <label>Student Picture</label>
    
            <StyledDropZone 
            onDrop={files => setSelectedFile(files)}>
            {({getRootProps, getInputProps}) => (
              <div className="container">
                    <div
                    {...getRootProps({
                        className: 'dropzone',
                        onDrop: event => event.stopPropagation()
                    })}
                    >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </div>
                    )}
                </StyledDropZone>
                <p>{studentFileName}</p>
                <br></br>
                <label className='formLabel'>Student Name</label>
                <input type="text" value={studentName} onChange={(e)=>{setStudentName(e.target.value)}}/>
                <br></br>
                <label className='formLabel'>Course</label>
                    <select options={Course} value={studentCourse} onChange={(e)=> {setStudentCourse(e.target.value)}}>
                        <option>Select Course</option>
                        {classesList}
                    </select>
                <br></br>
                <label className='formLabel'>New Student Survey</label>
                <input type="text" value={studentSurvey} onChange={(e)=>{setStudentSurvey(e.target.value)}}/> 
                <br></br>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
