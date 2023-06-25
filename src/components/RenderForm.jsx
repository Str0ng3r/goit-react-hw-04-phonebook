import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { addBackContacts} from "redux/contactsSlice";
import style from 'style.module.css'
export const RenderForm = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  const [name,setName] = useState('')
const [number,setNumber] = useState('')

const updateName = (evt) => {
  setName(evt.target.value)
  console.log(name)
  } 
  const updateNum = (evt)=> {
    setNumber(evt.target.value)
    console.log(number)
  }


  const addContactFunc = (name, number) => {
    const isNameAlreadyExists = contacts.some(contact => contact.name === name);
    if (isNameAlreadyExists) {
      alert('Такое имя уже существует');
      return;
    }

    const newContact = {
      name: name,
      number: number,
    };
    dispatch(addBackContacts(newContact));
  };


  const handleSubmit = evt => {
    evt.preventDefault();
    addContactFunc(name, number);
    setName('')
    setNumber('')
  };
    
    return (
      <div className={style.formContainerRend}>
        <form onSubmit={handleSubmit} className={style.form}>
        <h1 className={style.mainTitle}>PhoneBook</h1>
        <div className={style.inputGroup}>
        <label className={style.label}>Name</label>
        <input
          onChange={updateName}
          type="text"
          name="name"
          className={style.inputForm}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        </div>

        <div className={style.inputGroup}>
        <label className={style.label}>Number</label>
        <input
          onChange={updateNum}
          value={number}
          type="tel"
          name="number"
          className={style.inputForm}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        </div>
        <button type="submit" className={style.buttonLogin}>Add new contact</button>
      </form>
      </div>
    )
}