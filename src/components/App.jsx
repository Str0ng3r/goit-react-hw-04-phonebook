import React from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "redux/store"; 
import { RenderForm } from "./RenderForm";
import { ListRender } from "./ListRender";
import { FilterRend } from "./FilterRend";
import { Notify } from "./Notify";

import { setFilter, deleteContact, addContact} from "redux/contactsSlice";

export const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filterContactsByName = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filterFunc = (evt) => {
    dispatch(setFilter(evt.target.value));
  };

  const deleteContactFunc = (id) => {
    dispatch(deleteContact(id));
  };

  const addContactFunc = (name, number) => {
    const isNameAlreadyExists = contacts.some(
      (contact) => contact.name === name
    );
    if (isNameAlreadyExists) {
      alert("Такое имя уже существует");
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    dispatch(addContact(newContact));
  };

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
          color: "#010101",
        }}
      >
        <RenderForm addContact={addContactFunc}></RenderForm>
        {contacts.length > 0 && (
          <ListRender
            arrayFunc={filterContactsByName}
            deleteFunc={deleteContactFunc}
          ></ListRender>
        )}
        {contacts.length === 0 && (
          <Notify message={"Пожалуйста, добавьте новый контакт"}></Notify>
        )}
        <FilterRend filtertg={filter} funcfiltr={filterFunc}></FilterRend>
      </div>
    </PersistGate>
  );
};