// import todo model
const Todos = require('../models/todo');
const moment = require('moment');
const mongoose = require('mongoose');

const getAllTodos = async () => {
    try {
        const todos = await Todos.find({});
        return todos;
    } catch (error) {
        throw error;
    }
}

const createTodo = async (title, description, dueDate, completed) => {
    try {
        const momentDate = moment(dueDate).format('YYYY-MM-DD');
        const newTodo = new Todos({
            title,
            description,
            dueDate:momentDate,
            completed
        });
        await newTodo.save();
        return newTodo;
        
    }
    catch (error) {
        throw error;
    }
}

const updateTodo = async (id, title, description, dueDate, completed) => {
    try {
        const momentDate = moment(dueDate).format('YYYY-MM-DD');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }
        const updatedTodo = await Todos.findByIdAndUpdate(id,
            {
                title,
                description,
                dueDate:momentDate,
                completed
            },
            { new: true }
        );

        return updatedTodo;
        
    } catch (error) {
        throw error;
    }

}

const deleteTodo = async (id) => { 
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }
        //const deletedTodo = await Todos.findByIdAndDelete(id);
        // return deletedTodo;
        await Todos.findByIdAndDelete(id);
        
    } catch (error) {
        throw new Error('An error occured while deleting todo task');
        
    }
}
module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
}