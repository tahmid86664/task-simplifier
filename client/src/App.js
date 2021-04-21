import React, { useEffect, useState } from 'react';
import axios from './axios/axios';

import './App.css';

import Sidebar from './components/sidebar/sidebar.component';
import Todos from './components/todos/todos.component';
import Login from './components/login/login.component';
import { useStateValue } from './context-api/StateProvider';

function App() {
  const [todos, setTodos] = useState([]);
  const [{ user }] = useStateValue();
  const [userEmail, setUID] = useState('');
  const [isNewUser, setNewUser] = useState(false);

  const handleCallBackUserAdded = (childData) => {
    setNewUser(childData);
  }

  const handleCallBackUser = (childData) => {
    const tempUser = childData;
    if (tempUser === null) {
      setUID('');
      setTodos([]);
    } else {
      setUID(tempUser.uid);
    }
  }

  useEffect(() => {
    if(isNewUser){
      if(userEmail !== ''){
        axios.get('/todo/sync/'+userEmail).then((res) => {
          setTodos(res.data);
        });
      }
    } else {
      if ( user ) {
      axios.get('/todo/sync/'+user.uid).then((res) => {
        setTodos(res.data);
      });
      }
    }
  }, [todos, userEmail, isNewUser, user]);

  // console.log(userEmail);
  return (
    <div className="app">
      {!user ? (
        <Login parentCallbackForUser={handleCallBackUser} parentCallBackForUserAdded={handleCallBackUserAdded} />
      ) : (
        <div className="app__body">
          <Sidebar parentCallbackForUser={handleCallBackUser} parentCallBackForUserAdded={handleCallBackUserAdded} />
          <Todos todos={todos}/>
        </div>
      )}
    </div>
  );
}

export default App;
