// import todo model
const Todos = require('../models/todo');
const moment = require('moment');
const mongoose = require('mongoose');

const getAllTodos = async () => {
        const todos = await Todos.find({});
        return todos;
}

const createTodo = async (title, description, dueDate, isActive, status) => {
    const formats = ['YYYY/MM/DD', 'M/D/YYYY', 'YYYY-MM-DD'];
    // const isoDate = moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD');
    // const momentDate = moment(isoDate).format('YYYY-MM-DD');
    // const momentDate = moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD');
    const momentDate = moment(dueDate, formats).format('YYYY-MM-DD');
    
        const newTodo = new Todos({
            title,
            description,
            dueDate:momentDate,
            isActive,
            status
        });
        await newTodo.save();
        return newTodo;
}

const updateTodo = async (id, title, description, dueDate, isActive,status) => {
    // const isoDate = moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD');
    // const momentDate = moment(isoDate).format('YYYY-MM-DD');

    const momentDate = dueDate ? moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD') : undefined;
    console.log(id);
    console.log(id);
    console.log(dueDate);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }
        const updatedTodo = await Todos.findByIdAndUpdate(id,
            {
                title,
                description,
                dueDate:momentDate,
                isActive,
                status
            },
            { new: true }
        );

        return updatedTodo;
        

}

const deleteTodo = async (id) => { 
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }
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