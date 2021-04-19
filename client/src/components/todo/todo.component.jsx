import React, { useState } from 'react';
import axios from '../../axios/axios';

import './todo.style.css';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

const Todo = ({ todo }) => {
    // for editing
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoReminder, setEditTodoReminder] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');

    // bool for activing edit option
    const [editTodoID, setEditTodoID] = useState('');
    const [isActiveEdit, setActiveEdit] = useState(false);

    const editTodo = async (event, id) => {
        // check all the attributes value are same or not
        // if same then no need to update
        // but if not then update the todo
        // now we're considering, we've to update todo

        event.preventDefault();

        await axios.post('/todo/edit', {
        _id: id,
        name: editTodoName,
        time: new Date().toLocaleString(),
        reminderTime: editTodoReminder,
        description: editTodoDescription
        });

        // reset all edited variables
        setEditTodoName('')
        setEditTodoReminder('')
        setEditTodoDescription('')
        setEditTodoID('')
        setActiveEdit(false)
        console.log('fired');
    }

    const deleteTodo = async (id) => {
        await axios.post('/todo/delete', {
        id: id 
        })
        // console.log("delete hitted " + data);
    }

    const setEditField = (todo) => {
        if( !isActiveEdit ){
        setEditTodoName(todo.name)
        setEditTodoReminder(todo.reminderTime)
        setEditTodoDescription(todo.description)
        setEditTodoID(todo._id)
        setActiveEdit(true)
        }else {
        setEditTodoName('')
        setEditTodoReminder('')
        setEditTodoDescription('')
        setEditTodoID('')
        setActiveEdit(false)
        }
    }

    return (
        <div>
            <div className="todo" >
                <div className="todo__info">
                    <p className="todo__name">{ todo.name }</p>
                    <p className="todo__time">{ todo.time }</p>
                    <p className="todo__time">{ todo.reminderTime }</p>
                    <p className="todo__description">{ todo.description }</p>
                </div>
                <div className="todo__button__right" >
                    <IconButton onClick={() => setEditField(todo)}><EditTwoToneIcon /></IconButton>
                    <IconButton onClick={() => deleteTodo(todo._id)}><DeleteForeverIcon /></IconButton>
                </div>
            </div>
            <div className={`todo__edit ${todo._id === editTodoID ? "todo__edit__active" : ""}`}>
                <form className="todo__form">
                    <div className="todo__input__container">
                        <input className="todo__input" placeholder="todo name" value={editTodoName} onChange={event => setEditTodoName(event.target.value)}/>
                    </div>
                    <div className="todo__input__container">
                        <input className="todo__input" placeholder="time you want to remind" value={editTodoReminder} onChange={event => setEditTodoReminder(event.target.value)}/>
                    </div>
                    <div className="todo__input__container">
                        <input className="todo__input" placeholder="give a description" value={editTodoDescription} onChange={event => setEditTodoDescription(event.target.value)}/>
                    </div>
                    <button className="todo__addButton" onClick={(event) => editTodo(event, todo._id)}>Edit Todo</button>
                </form>
            </div>
        </div>
    );
}


export default Todo;