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
    <div className={style.formContainer}>
      <form className={style.form}>
        <h1 className={style.title}>Registration</h1>

        <div className={style.inputGroup}>
        <label className={style.label}>name</label>
        <input
          type="text"
          className={style.inputForm}
          value={name}
          onChange={evt => {
            setName(evt.target.value);
          }}
        />
        </div>
        <div className={style.inputGroup}>
        <label className={style.label}>email</label>
        <input
          type="text"
          value={email}
          className={style.inputForm}
          onChange={evt => {
            setEmail(evt.target.value);
          }}
        />
        </div>
        <div className={style.inputGroup}>
        <label className={style.label}>password</label>
        <input
          type="password"
          value={password}
          className={style.inputForm}
          onChange={evt => {
            setPassword(evt.target.value);
          }}
        />
        </div>
        <button type="submit"  className={style.buttonLogin} onClick={createUserFunc}>
          Registration
        </button>
      </form>
      <h2 className={style.forgotCreate}>Have account?</h2>
      <Link to={'/login'} className={style.forgotCreateLink}>Click here</Link>
    </div>
  );
};
