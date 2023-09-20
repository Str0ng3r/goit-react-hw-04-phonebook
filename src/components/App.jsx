import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Registration } from './Registration';
import { Login } from './Login';
import { Home } from './Home';
import { Header } from './Header';
import PrivateRoute from 'PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser} from 'redux/contactsSlice';


export const App = () => {
const dispatch = useDispatch()
const author = useSelector(state => state.info.autorizated)
const token = useSelector(state => state.token)
const navigate = useNavigate();

useEffect(()=> {
  if(token !== ''){
dispatch(refreshUser(token))
  }
   if(author){
  navigate('/contacts')

}
},[token,dispatch,author,navigate])
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:'#0B1227',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection:'column'
      }}
    >
    <Header></Header>
      <Routes>
        <Route path='/contacts' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
        <Route path='/registr' element={<Registration></Registration>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
};