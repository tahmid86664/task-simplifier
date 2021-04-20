import React, { useState } from 'react';
import axios from '../../axios/axios';
import TimeField from 'react-simple-timefield';

import { auth } from '../../firebase/firebase';
import { actionTypes } from '../../context-api/reducer';
import { useStateValue } from '../../context-api/StateProvider';

import './sidebar.style.css';

import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

const Sidebar = ({ parentCallbackForUser, parentCallBackForUserAdded }) => {
    const [inputTodoName, setInputTodoName] = useState('');
    const [inputTodoReminder, setInputTodoReminder] = useState('12:00');
    const [inputTodoDescription, setInputTodoDescription] = useState('');
    const [{ user }, dispatch] = useStateValue();

    const addTodo = async (event) => {
        event.preventDefault();
        // setTodos([...todos, input]);
        const date = new Date();
        if (inputTodoName !== ''){
          await axios.post('/todo/add/'+user.email, {
            _id: inputTodoName+date.getHours()+''+date.getMinutes()+''+date.getSeconds(),
            name: inputTodoName,
            time: new Date().toLocaleString(),
            reminderTime: inputTodoReminder,
            description: inputTodoDescription
          });
        }
    
        setInputTodoName('');
        setInputTodoReminder('');
        setInputTodoDescription('');
        console.log('fired');
    }

    const logout = () => {
      auth.signOut().then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        });
        parentCallbackForUser(null);
        parentCallBackForUserAdded(false);  
      }).catch(err => alert(err.message));
    }


    return (
        <div className="todo__sidebar">
          <div className="todo__sidebar__top">
            <h1 className="title">Task Simplifier</h1>
            <p className="greetings">Welcome back, &#8220;{ user.displayName }&#8221;!</p>
          </div>
          <div className="todo__sidebar__bottom">
            <form className="todo__form">
              <div className="todo__input__container">
                <input className="todo__input" placeholder="todo name" value={inputTodoName} onChange={event => setInputTodoName(event.target.value)}/>
              </div>
              <div className="todo__input__container">
                <AccessAlarmsIcon />
                <TimeField value={inputTodoReminder} onChange={event => setInputTodoReminder(event.target.value)}/>
                {/* <input className="todo__input" placeholder="time you want to remind" value={inputTodoReminder} onChange={event => setInputTodoReminder(event.target.value)}/> */}
              </div>
              <div className="todo__input__container">
                <input className="todo__input" placeholder="give a description" value={inputTodoDescription} onChange={event => setInputTodoDescription(event.target.value)}/>
              </div>
              <button className="todo__addButton" onClick={addTodo}>Add Todo</button>
            </form>
          </div>
          <div className="sidebar__footer__section">
            <button className="logout__button" onClick={logout}>Logout</button>
          </div>
        </div>
    );
}


export default Sidebar;