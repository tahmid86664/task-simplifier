import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    name: String,
    time: String,
    reminderTime: String,
    description: String,
});


export default mongoose.model('todos', todoSchema);