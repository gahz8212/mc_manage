import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from './store';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage'
import HomePage from './pages/HomePage';
import './lib/styles/index.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/join' element={<JoinPage />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
      </Routes>
    </Provider >
  );
};

export default App;