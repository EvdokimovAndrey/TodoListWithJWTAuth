const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date_of_end, 
      date_of_creation, 
      date_of_update, 
      _priority_, 
      _status_, 
      creater, 
      responsible
     } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (title, description, date_of_end, date_of_creation, date_of_update, _priority_, _status_, creater, responsible) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        title, 
        description, 
        date_of_end, 
        date_of_creation, 
        date_of_update, 
        _priority_, 
        _status_, 
        creater, 
        responsible
      ]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});


app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("server has started on port 5000");
});