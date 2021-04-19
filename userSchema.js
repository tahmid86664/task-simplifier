import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    todos: Array
});


export default mongoose.model('users', userSchema);