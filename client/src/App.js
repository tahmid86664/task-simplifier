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
  const [userEmail, setEmail] = useState('');
  const [isUserAdded, setUserAdded] = useState(false);

  const handleCallBackUserAdded = (childData) => {
    setUserAdded(childData);
  }

  const handleCallBackUser = (childData) => {
    const tempUser = childData;
    if (tempUser === null) {
      setEmail('');
    } else {
      setEmail(tempUser.email);
    }
  }

  useEffect(() => {
    if(user && !isUserAdded){
      axios.post('/user/add', {
        name: user.displayName,
        email: user.email,
        todos: []
      })
      setUserAdded(true);
      // console.log("on time called")
    }
  }, [user, isUserAdded]);

  useEffect(() => {
    if(userEmail !== ''){
    axios.get('/todo/sync/'+userEmail.split("@")[0]).then((res) => {
      setTodos(res.data);
    });
    }
  }, [todos, userEmail]);

  // console.log(userEmail);
  return (
    <div className="app">
      {!user ? (
        <Login parentCallbackForUser={handleCallBackUser} />
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
