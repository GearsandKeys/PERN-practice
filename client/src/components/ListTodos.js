import React, { Fragment, useEffect, useState } from 'react';

import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]); //set default as empty state

    //delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id)); //filters out todos with matching id
        console.log(deleteTodo);
        } catch (err) {
            console.error(err.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            //going to get data back, but need to parse it
            const jsonData = await response.json();
           
            //console.log(jsonData);
            setTodos(jsonData); //set the todos state = to the json data we fetched from the db
        } catch (err) {
            console.error(err.message);
        }
    }
    
    //makes a fetch request to restful API every time component is rendered
    useEffect(() => {
        getTodos();
    }, []); //without the [], the useEffect would keep making requests over and over
    
    //console.log(todos);

    return <Fragment>
        <table className="table mt-5 text-center">
        <thead>
        <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {/* Here as a reminder of how to structure
        <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
        </tr>
        */}
        {todos.map(todo => (
            <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td> <EditTodo todo={todo} /> </td>
                <td> 
                    <button className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}> Delete </button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
  </Fragment>
};

export default ListTodos;