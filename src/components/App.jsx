import {useState,useEffect } from "react";
import { nanoid } from "nanoid";
import { RenderForm } from "./RenderForm";
import { ListRender } from "./ListRender";
import { FilterRend } from "./FilterRend";
import { Notify } from "./Notify";
export const App = () => {

const [contact,setContact] = useState([])
const [filter,setFilter] = useState('')


useEffect(()=> {
  const localContacts = JSON.parse(localStorage.getItem('contacts'));
  if (localContacts) {
    setContact(localContacts);
  }
},[]);



const filterContactsByName = () => {
  return contact.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};


const filterFunc = (evt) => {
setFilter(evt.target.value)
}




const deleteContact = (id) => {
  const updatedContacts = contact.filter((contact) => contact.id !== id);
  setContact(updatedContacts);
  localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Исправлено на updatedContacts
};





const addContact = (name, number) => {
  const isNameAlreadyExists = contact.some(
    contact => contact.name === name
  );
  if (isNameAlreadyExists) {
    alert('Таке імя вже існує');
    return;
  }

  const newContact = {
    id: nanoid(),
    name:name,
    number:number,
  };
setContact([...contact, newContact])
      localStorage.setItem(
        'contactsLocale',
        JSON.stringify(contact)
      );
    }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
<RenderForm addContact={addContact}></RenderForm>
{contact.length>0 && <ListRender arrayFunc={filterContactsByName} deleteFunc={deleteContact}></ListRender>}
{contact.length === 0 && <Notify message={'plz add new contact'}></Notify>}
<FilterRend filtertg={filter} funcfiltr={filterFunc}></FilterRend>
    </div>
  );
};
