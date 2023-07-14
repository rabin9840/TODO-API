const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
    status: { type: String, enum: ['todo', 'ongoing', 'completed'], default: 'todo' }
},
    { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;