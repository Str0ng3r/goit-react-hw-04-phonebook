import {Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import style from 'style.module.css'
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "redux/contactsSlice";
export const Header = () => {
const dispatch = useDispatch()
    const nameUser = useSelector(state => state.info.name)
    const emailUser = useSelector(state => state.info.email)
    const author = useSelector(state=> state.info.autorizated)
    return (
        <header className={style.header}>
<Link to={'/'}>Home</Link>
{!author && <Link to={'/registr'}>Registration</Link>}
{!author && <Link to={'/login'}>Login</Link>}

<div className={style.contAuthor}>
<div className={style.blockInfo}>
{nameUser && <p className={style.name}>{nameUser}</p>}
{emailUser && <p className={style.email}>{emailUser}</p>}
</div>
{author && <button type="button" onClick={() => {dispatch(logOut())}} className={style.btnLogOut}>Log Out</button>}
</div>

<Outlet/>
        </header>

    )
}