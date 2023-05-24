import { useState } from "react"
export const RenderForm = ({addContact}) => {
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


  const handleSubmit = evt => {
    evt.preventDefault();
    addContact(name, number);
    setName('')
    setNumber('')
  };
    
    return (
        <form onSubmit={handleSubmit}>
        <h1>PhoneBook</h1>
        <h2>Name</h2>
        <input
          onChange={updateName}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <input
          onChange={updateNum}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add</button>
      </form>
    )
}