import React, { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/home/Home';
import CreateView from './Components/posts/CreateView';
import UpdateView from './Components/posts/UpdateView';
import DetailView from './Components/posts/DetailView';
import SignIn from './Components/account/SignIn';
import SignUp from './Components/account/SignUp';
import PasswordResetEmail from './Components/account/PasswordResetEmail';
import CategoryPosts from './Components/posts/CategoryPosts';
import AuthorPost from './Components/posts/authorPost';
import ActivationEmail from './Components/account/ActivationEmail';
import About from './Components/home/about';
import Contact from './Components/home/Contact';

function App() {

  const [toggle, settoggle] = useState(false)
  const [user, setuser] = useState({})
  const getUser = async () => {
    const response = await fetch("http://localhost:8000/api/users/getuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    let json = await response.json();
    setuser(json);
    settoggle(prev => !prev)
    console.log(user)
  }

 

  return (
    <>
      <BrowserRouter>
        <Navbar toggle={toggle} settoggle={settoggle} />
        <Switch>
          <Route exact path="/">
            <Home getUser={getUser} toggle={toggle} />
          </Route>
          <Route exact path="/createpost">
            <CreateView getUser={getUser} user={user.username} toggle={toggle} settoggle={settoggle} />
          </Route>
          <Route exact path="/updatepost/:id">
            <UpdateView getUser={getUser} user={user.username} />
          </Route>
          <Route exact path="/postdetail/:id">
            <DetailView getUser={getUser} user={user.username} userId={user.id} toggle={toggle} />
          </Route>
          <Route exact path="/posts/category/:category">
            <CategoryPosts />
          </Route>
          <Route exact path="/posts/author/:author">
            <AuthorPost toggle={toggle} settoggle={settoggle} />
          </Route>
          <Route exact path="/signin">
            <SignIn toggle={toggle} settoggle={settoggle} />
          </Route>
          <Route exact path="/signup">
            <SignUp toggle={toggle} settoggle={settoggle} />
          </Route>
          <Route exact path="/activationmail">
            <ActivationEmail />
          </Route>
          <Route exact path="/password-reset">
            <PasswordResetEmail />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
