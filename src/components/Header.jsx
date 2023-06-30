import {Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import style from 'style.module.css'
import { useDispatch, useSelector } from "react-redux";
import {  userLogOut } from "redux/contactsSlice";
export const Header = () => {
const dispatch = useDispatch()
    const nameUser = useSelector(state => state.info.name)
    const emailUser = useSelector(state => state.info.email)
    const token = useSelector(state => state.info.token)
    const author = useSelector(state=> state.info.autorizated)
    return (
        <header className={style.header}>
{!author && <Link to={'/contacts'} className={style.btnLink}>PhoneBook</Link>}
{!author && <Link to={'/registr'} className={style.btnLink}>Registration</Link>}
{!author && <Link to={'/login'} className={style.btnLink}>Login</Link>}

{nameUser && <div className={style.contAuthor}>
<div className={style.blockInfo}>
<p className={style.name}>{nameUser}</p>
 <p className={style.email}>{emailUser}</p>
</div>
 <button type="button" onClick={() => {dispatch(userLogOut(token))}} className={style.btnLogOut}>Log Out</button>
</div>}

<Outlet/>
        </header>

    )
}