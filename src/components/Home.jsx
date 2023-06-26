import React from 'react';
import { useEffect } from 'react';
import {  useSelector,useDispatch } from 'react-redux';
import { RenderForm } from './RenderForm';
import { ListRender } from './ListRender';
import { FilterRend } from './FilterRend';
import { Notify } from './Notify';
import { fetchContacts } from 'redux/contactsSlice';
import style from 'style.module.css'
export const Home = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const loading = useSelector(state=> state.contacts.isLoading)
    const token = useSelector(state => state.info.token)
    useEffect(() => {
      dispatch(fetchContacts(token));
    }, [dispatch,token]);
    return (
<div className={style.contHomeRend}>
        <RenderForm></RenderForm>
    {loading && <h2 className={style.titleNotify}>LOADING...</h2>}

<div className={style.contFilters}>
   {contacts.length > 0 && <ListRender></ListRender>}
   {contacts.length === 0 && (
      <Notify message={'Пожалуйста, добавьте новый контакт'}></Notify>
     )}
      {contacts.length > 0 && (
      <FilterRend></FilterRend>
     )}
    </div>
    </div>
    )
}