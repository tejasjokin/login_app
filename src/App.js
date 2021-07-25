import React,{useState} from 'react'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import RegisterPage from './components/RegisterPage/RegisterPage.js';

function App() {

  const initialState = {
    email: '',
    firstname: ''
  }

  const [currentUser, setCurrentUser] = useState(initialState)

  return (
    <div className="App">
      <Switch>
        <Route 
        exact path='/' 
        render={
          () => <LoginPage setCurrentUser={setCurrentUser}/>
        }
        />
        <Route 
        path='/register' 
        render={
          () => <RegisterPage setCurrentUser={setCurrentUser}/>
        }
        />
        <Route 
        path='/dashboard'
        render={
          () => currentUser.email===''?(<Redirect to="/"/>):(<Dashboard />)
        }
        />
      </Switch>
    </div>
  );
}

export default App;
