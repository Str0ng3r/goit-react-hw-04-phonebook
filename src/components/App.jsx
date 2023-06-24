import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './Registration';
import { Login } from './Login';
import { Home } from './Home';
import { Header } from './Header';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection:'column'
      }}
    >
    <Header></Header>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path='/registr' element={<Registration></Registration>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
};