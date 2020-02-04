import React, { useState, useEffect } from "react";
import './loginScreen.css'

export default function LoginScreen(){


return (
    <div className='loginBox'>
        <h1>Login</h1>
        <br></br>
            <form className='loginForm'>
             <lable>Username/Email Address</lable>
             <input type='text'></input>
             <br></br>
            <label>Password </label>
        <input type='text'></input>
    </form>
    </div>
)

}