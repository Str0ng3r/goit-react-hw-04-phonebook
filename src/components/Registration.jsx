import React from 'react';

import {Link } from "react-router-dom";
import style from 'style.module.css'
export const Registration = () => {



return(
    <div className={style.divColumn}>
<form className={style.form}>
<h1>Registration</h1>
<h2>Plz write your email</h2>
<input type="text"/>
<h2>Plz write your password</h2>
<input type="password" />
<button type='submit'>Registration</button>
</form>
<h2>Have account?</h2><Link to={'/login'}>Click here</Link>
</div>
)
}