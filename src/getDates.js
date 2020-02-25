import React, { useState, useEffect } from "react";


export default function GetDates () {

useEffect(() => {
       
    getCourse();
    
 },[]);

const [classes, setClasses] = useState('')

 const[time, setTime] = useState()

 const [displayClass, setDisplayClass] = useState()



 var classDate;
 var timeBetweenClasses;
 var futureDates ;
 var nextClass;
 var ms ;
 var dateFormat ;
 var formatted ;


 var i;
 // console.log(classes)

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
  

 if(classes != "") {
  nextClass = classes.map((item, i) => {
      classDate = new Date(item.StartDate)
     timeBetweenClasses= Date.parse(classDate) - Date.now();  
      if(timeBetweenClasses > 1) {

         return timeBetweenClasses + Date.now()
     } 
     return 0
  }).filter (item => item !== 0).sort( function (a,b) {
     return a-b })

     ms = nextClass[0];
     dateFormat = "m-d-Y ";
     formatted = format(ms, dateFormat);
     console.log(formatted)
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
   }
 
}