// importing
import express from 'express'; // for use import statement we need to add "type":"module" script after "main"
import mongoose from 'mongoose';
import Todos from './todoSchema.js';
import Users from './userSchema.js';
import cors from 'cors';


// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());


// db config
const connectionUrl = 'mongodb+srv://tahmid:9YtOZvPwv7Fv3WmV@cluster0.0w3w3.mongodb.net/todo-mern-db?retryWrites=true&w=majority';

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("database is connected");
});

// ???



// api routes
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.post('/user/add', (req, res) => {
    const user = req.body;
    const email = user.email;

    // search user
    Users.find({email: email}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if(data.length === 0){
                console.log("new user should be inserted");
                Users.create(user, (err, data) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(201).send(data);
                    }
                })
            }else {
                console.log("user is already in database")
            }
        }
    })
});


app.post('/todo/add', (req, res) => {
    const todo = req.body;
    console.log(todo);
    Todos.create(todo, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/todo/sync', (req, res) => {
    Todos.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.post('/todo/delete', (req, res) => {
    const todo_id = req.body.id;
    Todos.deleteOne({_id: todo_id}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.post('/todo/edit', (req, res) => {
    const editedTodo = req.body;
    console.log(editedTodo);
    Todos.updateOne({_id: editedTodo._id},
        {
            $set: {
                name: editedTodo.name,
                time: editedTodo.time,
                reminderTime: editedTodo.reminderTime,
                description: editedTodo.description
            }
        }, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("todo updated")
            }
        });
});

// listen
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

