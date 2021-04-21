// importing
import express from 'express'; // for use import statement we need to add "type":"module" script after "main"
import mongoose from 'mongoose';
import Todos from './todoSchema.js';
import Users from './userSchema.js';
import cors from 'cors';
import path from 'path';


// app config
const app = express();
const __dirname = path.resolve();

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors({
    credentials: true,
    origin: ['https://task-simplifier.herokuapp.com', 'http://task-simplifier.herokuapp.com', 'task-simplifier.herokuapp.com','http://localhost:3000']
}));


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
    const uid = user.uid;

    // search user
    Users.find({uid: uid}, (err, data) => {
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


app.post('/todo/add/:uid', (req, res) => {
    const todo = req.body;
    console.log(todo);
    Users.updateOne({"uid": req.params.uid}, 
        {$push: {todos: todo}}, 
        (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/todo/sync/:uid', (req, res) => {
    console.log(req.params.uid);
    if(req.params.uid !== '' || req.params.uid !== null){
    Users.findOne({"uid": req.params.uid}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (data !== null) {
                res.status(201).send(data.todos);
                console.log(data.todos);
            }
        }
    });
    }
});

app.post('/todo/delete/:uid', (req, res) => {
    const todo_id = req.body.id;

    // if we delete an elemenmt of array inside an object
    // we need update method not the delete method one 
    Users.updateOne({"uid": req.params.uid}, 
        {$pull: {"todos": {_id: todo_id}}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
    
    // Todos.deleteOne({_id:todo_id}, (err, data) => {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         res.status(201).send(data);
    //     }
    // });
});

app.post('/todo/edit/:uid', (req, res) => {
    const editedTodo = req.body;
    console.log(editedTodo);
    // this is also an example of updating array element inside an object
    Users.updateOne({"uid": req.params.uid, "todos._id": editedTodo._id},
        {
            $set: {
                "todos.$.name": editedTodo.name,
                "todos.$.time": editedTodo.time,
                "todos.$.reminderTime": editedTodo.reminderTime,
                "todos.$.description": editedTodo.description
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

