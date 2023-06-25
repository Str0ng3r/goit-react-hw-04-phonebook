import style from 'style.module.css'
export const Notify = ({message}) =>{
    return(<h2 className={style.titleNotify}>{message}</h2>)
}