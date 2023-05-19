import { LiRender } from "./LiRender"
export const ListRender = ({arrayFunc,deleteFunc}) => {
    return(
        <ul>
{
    arrayFunc().map(item => (
       <LiRender key={item.id} name={item.name} number={item.number} id={item.id} deleteFunc={deleteFunc}></LiRender>
    ))
}
        </ul>
    )
}