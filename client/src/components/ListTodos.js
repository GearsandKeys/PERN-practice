import React, { Fragment, useEffect, useState } from 'react';

const ListTodos = () => {
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            //going to get data back, but need to parse it
            const jsonData = await response.json();
           
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    //makes a fetch request to restful API every time component is rendered
    useEffect(() => {
        getTodos();
    })
    
    
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
        </tbody>
    </table>
  </Fragment>
};

export default ListTodos;