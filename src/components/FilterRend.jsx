
import { setFilter} from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FilterRend = () => {
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();


    const filterFunc = evt => {
        dispatch(setFilter(evt.target.value));
      }; 
    return (
        <input type="text" value={filter} onChange={filterFunc} />
    )
}