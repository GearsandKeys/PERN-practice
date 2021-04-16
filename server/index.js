const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); //import pool from db.js
const { response } = require("express");

//middleware
app.use(cors());
app.use(express.json()); //for getting data from client side req.body

//ROUTES//

//create todo

app.post("/todos", async(req,res) => {
    try {
        //console.log(req.body); 
        const { description } = req.body;
        const newTodo =  await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", //$1 is postgres library for dynamic data
            [description] //this goes into the $1
        );

        res.json(newTodo.rows[0]) //now our response is just the description returned.
    } catch (err)  {
        console.error(err.message);
    }
});

//get all todos

app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a todo

app.get("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params; //makes id = the parameter at the end of the request
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
 })

//update a todo

app.put("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
        );
        
        res.json("Todo was updated!")
    } catch (error) {
        console.error(err.message)
    }
});


//delete a todo

app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

        res.json("Todo was deleted!")
    } catch (err) {
        console.error(err.message)        
    }
});


app.listen(5000, () => {
    console.log("Server has started on port 5000")
})

