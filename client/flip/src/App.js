import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Header from './compononents/common/Header/Header';
import styles from './App.module.css';
import Home from './compononents/views/Home';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.mainContainer}>
        {/* <Header /> */}
        <Route exact path='/'>
          <Home />
        </Route>
                {/* 
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/logout'>
          <Logout />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/posts/create'>
          {isLoggedIn ? (
            <CreatePostPage />
          ) : (
            <Redirect to='/' />
          )}
        </Route> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
