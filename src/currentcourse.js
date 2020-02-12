import React, { useState, useEffect } from "react";
import './currentcourse.css';


export default function CurrentCourse(props){


    useEffect(() => {
        
         getCourse();
        //  getCurrentCourse();
    },[]);

    //set up state variables
   const [classes, setClasses] = useState('')

   const[time, setTime] = useState()

   const [displayClass, setDisplayClass] = useState()

//fetch data for classes

//fetch list of classes
    function getCourse(res){
        fetch("http://localhost:5000/classes/"+props.Campus, {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setClasses(res);
           
        },
        )}
        
    
//fetch specific class with the most recent class date
       function getCurrentCourse(res) {
        fetch("http://localhost:5000/classes/"+props.Campus + "/" + futureDates, {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setDisplayClass(res);
        })}
   




//set up local variables
    var classDate;
    var timeBetweenClasses;
    var futureDates ;
    var nextClass;
    var ms ;
    var dateFormat ;
   
    var formatted ;
    var i;
    console.log(classes)
// const displayNextClass = classes.filter(function (classes) {return classes.StartDate === futureDates});
     
//map over array to isolate next class date
    if(classes != "") {
     nextClass = classes.map((item, i) => {

    //identify class start date
         classDate = new Date(item.StartDate)
        timeBetweenClasses= Date.parse(classDate) - Date.now();  
         if(timeBetweenClasses > 1) {
//find time between start dates and today to find next starting class
            return timeBetweenClasses + Date.now()
        } 
        return 0
        //remove classes that have already started and sort from soonest to latest
     }).filter (item => item !== 0).sort( function (a,b) {
        return a-b })

//run format date formula from MS to text short date
        ms = nextClass[0];
        dateFormat = "m-d-Y ";
        futureDates = format(ms, dateFormat);
        console.log(futureDates)
        return futureDates
    } 
    
    
//format date function

    function toDate(date) {
        if (date === void 0) {
          return new Date(0);
        }
        if (isDate(date)) {
          return date;
        } else {
          return new Date(parseFloat(date.toString()));
        }
      }
      function isDate(date) {
        return (date instanceof Date);
      }
    function format(date, format) {
        var d = toDate(date);
        return format
          .replace(/Y/gm, d.getFullYear().toString())
          .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
          .replace(/d/gm, ('0' + (d.getDate() + 1)).substr(-2))
      }    
  
      console.log(nextClass)
     
    //   displayNextClass = classes.filter(classes.StartDate === {futureDates})
      
    
      
      



    
    return(
        <div id="currentCourse">
            <div>
            <h1>{props.Course}</h1>
            <img id="locationImage" src={props.image}></img>
            </div>
            <span>Current Class dates</span>
            <span>Current Class dates</span>
        </div>
    );

}

