import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from 'style.module.css';
import { loginUser } from 'redux/contactsSlice';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.info.autorizated);
  const navigate = useNavigate();


  
  const handleLogin = (evt) => {
    evt.preventDefault();

    const dataUser = {
      email: email,
      password: password,
    };

    dispatch(loginUser(dataUser)).unwrap().then(()=> {
        navigate('/')
        alert(`welcome`)
    }).catch(()=> {
        alert('Error this user dont have in system')
    })

    setEmail('');
    setPassword('');
  }
  
  
  
  useEffect(() => {
    if (author) {
      navigate('/');
    }
  }, [author, navigate]);
  return (

    <div className={style.divColumn}>
            {!author && <h2>You are not logined</h2>}
      <form className={style.form}>
        <h1>Login</h1>
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
        <button
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <h2>Don't have account?</h2>
      <Link to={'/registr'}>Click here</Link>
    </div>
  );
};
