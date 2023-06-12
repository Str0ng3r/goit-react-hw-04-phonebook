import React from 'react';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'redux/store';
import { RenderForm } from './RenderForm';
import { ListRender } from './ListRender';
import { FilterRend } from './FilterRend';
import { Notify } from './Notify';


export const App = () => {
  const contacts = useSelector(state => state.contacts);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <RenderForm></RenderForm>
        {contacts.length > 0 && (
          <ListRender></ListRender>
        )}
        {contacts.length === 0 && (
          <Notify message={'Пожалуйста, добавьте новый контакт'}></Notify>
        )}
        <FilterRend></FilterRend>
      </div>
    </PersistGate>
  );
};
