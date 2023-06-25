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

    <div className={style.formContainer}>
            {!author && <h2 className={style.title}>You are not logined</h2>}
      <form className={style.form}>
        <h1 className={style.title}>Login</h1>
        
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
        id='password'
          type="password"
          value={password}
          className={style.inputForm}
          onChange={evt => {
            setPassword(evt.target.value);
          }}
        />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className={style.buttonLogin}
        >
          Login
        </button>
      </form>
      <h2 className={style.forgotCreate}>Don't have account?</h2>
      <Link to={'/registr'} className={style.forgotCreateLink}>Click here</Link>
    </div>
  );
};
