import { LiRender } from "./LiRender"
import { useDispatch, useSelector } from 'react-redux';
import { deleteBackContacts} from "redux/contactsSlice";
export const ListRender = () => {
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

 
    const deleteContactFunc = id => {
      console.log(id)
        dispatch(deleteBackContacts(id));
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