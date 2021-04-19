import React from 'react';

import './todos.style.css';

import Todo from '../todo/todo.component';

const Todos = ({ todos }) => {
    return (
        <div className="todos">
            {todos.map(todo => (
              <Todo key={todo._id} todo={ todo } />
            ))}
        </div>
    );
}


export default Todos;