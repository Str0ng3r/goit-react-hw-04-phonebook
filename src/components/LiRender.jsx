export const LiRender = ({name,number,id,deleteFunc}) => {
return(
<li>{name}:{number} <button onClick={() => deleteFunc(id)}>DEL</button></li>
)
}