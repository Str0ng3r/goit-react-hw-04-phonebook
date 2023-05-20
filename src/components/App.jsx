import {useState,useEffect } from "react";
import { nanoid } from "nanoid";
import { RenderForm } from "./RenderForm";
import { ListRender } from "./ListRender";
import { FilterRend } from "./FilterRend";
import { Notify } from "./Notify";
export const App = () => {

const [name,setName] = useState('')
const [number,setNumber] = useState('')
const [contact,setContact] = useState([])
const [filter,setFilter] = useState('')


useEffect(()=> {
  const localContacts = JSON.parse(localStorage.getItem('contacts'));
  if (localContacts) {
    setContact(localContacts);
  }
},[]);


const updateName = (evt) => {
setName(evt.target.value)
console.log(name)
} 


const filterContactsByName = () => {
  return contact.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};


const filterFunc = (evt) => {
setFilter(evt.target.value)
}

const deleteContact = id => {
    const updatedContacts = contact.filter(
      contact => contact.id !== id
    )
      setContact(updatedContacts)
      localStorage.setItem('contacts',JSON.stringify(contact))
}

const updateNum = (evt)=> {
  setNumber(evt.target.value)
  console.log(number)
}

const handelClick = (evt) => {
  evt.preventDefault()
  const cont = {
    name:name,
    number:number,
    id:nanoid()
  }
  setContact([...contact, cont])
  setName('')
  setNumber('')
  localStorage.setItem('contacts',JSON.stringify([...contact, cont]))
  setTimeout(()=> {
    console.log(contact)
  },3000)
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
<RenderForm funcSubmit={handelClick} funcNumber={updateNum} funcName={updateName} number={number} name={name}></RenderForm>
{contact.length>0 && <ListRender arrayFunc={filterContactsByName} deleteFunc={deleteContact}></ListRender>}
{contact.length === 0 && <Notify message={'plz add new contact'}></Notify>}
<FilterRend filtertg={filter} funcfiltr={filterFunc}></FilterRend>
    </div>
  );
};
