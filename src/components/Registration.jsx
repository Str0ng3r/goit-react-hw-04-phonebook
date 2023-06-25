import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from 'style.module.css';
import { useDispatch } from 'react-redux';
import { addNewUser } from 'redux/contactsSlice';
export const Registration = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUserFunc = async evt => {
    evt.preventDefault();
    try {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      const actionResult = await dispatch(addNewUser(user));
      if (addNewUser.fulfilled.match(actionResult)) {
        setPassword('');
        setEmail('');
        setName('');
        navigate('/login');
      } else if (addNewUser.rejected.match(actionResult)) {
        console.error('Ошибка при регистрации:', actionResult.error.message);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error.message);
    }
  };

  return (
    <div className={style.divColumn}>
      <form className={style.form}>
        <h1>Registration</h1>

        <h2>Plz write your name</h2>
        <input
          type="text"
          value={name}
          onChange={evt => {
            setName(evt.target.value);
          }}
        />
        <h2>Plz write your email</h2>
        <input
          type="text"
          value={email}
          onChange={evt => {
            setEmail(evt.target.value);
          }}
        />
        <h2>Plz write your password</h2>
        <input
          type="password"
          value={password}
          onChange={evt => {
            setPassword(evt.target.value);
          }}
        />
        <button type="submit" onClick={createUserFunc}>
          Registration
        </button>
      </form>
      <h2>Have account?</h2>
      <Link to={'/login'}>Click here</Link>
    </div>
  );
};
