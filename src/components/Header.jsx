import {Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import style from 'style.module.css'
export const Header = () => {
    return (
        <header className={style.header}>
<Link to={'/'}>Home</Link>
<Link to={'/registr'}>Registration</Link>
<Link to={'/login'}>Login</Link>
<button type="button">Log Out</button>
<Outlet/>
        </header>

    )
}