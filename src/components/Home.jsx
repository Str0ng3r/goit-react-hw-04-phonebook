import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RenderForm } from './RenderForm';
import { ListRender } from './ListRender';
import { FilterRend } from './FilterRend';
import { Notify } from './Notify';
import { fetchContacts } from 'redux/contactsSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const loading = useSelector(state=> state.contacts.isLoading)
    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);
    return ( 
<div>
        <RenderForm></RenderForm>
    {loading && <h2>LOADING...</h2>}
   {contacts.length > 0 && <ListRender></ListRender>}
   {contacts.length === 0 && (
      <Notify message={'Пожалуйста, добавьте новый контакт'}></Notify>
     )}
    <FilterRend></FilterRend>
    </div>
    )
}