import style from 'style.module.css'

export const LiRender = ({name,number,id,deleteFunc}) => {
return(
<li className={style.li_list}>{name}:<span>{number}</span> <button onClick={() => deleteFunc(id)} className={style.button_del}>DEL</button></li>
)
}