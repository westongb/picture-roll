import React, { useState, useEffect } from "react";
import './currentcourse.css';


export default function CurrentCourse(props){

    useEffect(() => {
        getCourse({});
    },[]);

   const [classes, setClasses] = useState('')

    const[time, setTime] = useState()


    function getCourse(res){
        fetch("http://localhost:5000/classes/"+props.Campus, {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setClasses(res);
         

        },
        // (error) => {
        //     setClasses("error")
        // }
        )
    }

    var classDate;
    var timeBetweenClasses;
    var futureDates;
    var nextClass;
    var ms ;
    var dateFormat ;
    var formatted ;
   
  
    var i;
    // console.log(classes)

    
     
   

    if(classes != "") {
     nextClass = classes.map((item, i) => {
         classDate = new Date(item.StartDate)
        timeBetweenClasses= Date.parse(classDate) - Date.now();  
        // var dateList = Array.from(timeBetweenClasses);
        // futureDates = dateList.filter(dateList => dateList > 1);
        // console.log(timeBetweenClasses)
        if(timeBetweenClasses > 1) {

            return timeBetweenClasses + Date.now()
        } 
        return 0
     }).filter (item => item !== 0).sort( function (a,b) {
        return a-b })
        ms = nextClass;
        dateFormat = "Y-m-d H:i:s.v";
        formatted = format(ms, dateFormat);
        console.log(formatted);


     console.log(nextClass);
        return nextClass
        
    }
  
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
          .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
          .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
          .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
          .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
      }
      //TEST


      






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

