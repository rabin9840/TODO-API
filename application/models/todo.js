const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
    status: { type: String, enum: ['todo', 'ongoing', 'completed'], default: 'todo' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
    { timestamps: true }
);

// use mongoose-paginate-v2
todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;