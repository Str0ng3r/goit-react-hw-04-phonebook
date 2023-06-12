import { LiRender } from "./LiRender"
import { useDispatch, useSelector } from 'react-redux';
import {  deleteContact} from 'redux/contactsSlice';
export const ListRender = () => {
    const contacts = useSelector(state => state.contacts);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();
 
    const deleteContactFunc = id => {
        dispatch(deleteContact(id));
      };

    const filterContactsByName = () => {
        return contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
      };

    return(
        <ul>
{
    filterContactsByName().map(item => (
       <LiRender key={item.id} name={item.name} number={item.number} id={item.id} deleteFunc={deleteContactFunc}></LiRender>
    ))
}
        </ul>
    )
}