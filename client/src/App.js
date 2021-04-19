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

  useEffect(() => {
    if(user){
      axios.post('/user/add', {
        name: user.displayName,
        email: user.email,
        todos: []
      })
    } else {
      console.log("User already in database");
    }
  }, [user]);

  useEffect(() => {
    axios.get('/todo/sync').then((res) => {
      setTodos(res.data);
    });
  }, [todos]);

  // console.log(inputTodoName);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Todos todos={todos}/>
        </div>
      )}
    </div>
  );
}

export default App;
