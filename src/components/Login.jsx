import React from 'react';
import {Link } from "react-router-dom";
import style from 'style.module.css'
export const Login = () => {
    return(
        <div className={style.divColumn}>
        <form className={style.form}>
<h1>Login</h1>
<h2>Plz write your email</h2>
<input type="text" />
<h2>Plz write your password</h2>
<input type="password" />
<button type='submit'>Login</button>
</form>
<h2>Don't have account?</h2><Link to={'/registr'}>Click here</Link>
</div>
    )
}