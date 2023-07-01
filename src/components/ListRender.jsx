import { LiRender } from "./LiRender"
import { useDispatch, useSelector } from 'react-redux';
import { deleteBackContacts} from "redux/contactsSlice";
export const ListRender = () => {
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filter);
    const token = useSelector(state => state.token)
    const dispatch = useDispatch();

 
    const deleteContactFunc = id => {
      console.log(id)
      const payload = {
        id: id,
        token: token
      };
      dispatch(deleteBackContacts(payload));
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