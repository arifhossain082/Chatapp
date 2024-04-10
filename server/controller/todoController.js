const todoModel = require('../model/todoModel');

const createTodo = async (req, res) => {
    const { userId, text } = req.body;

    try{
        const todo = new todoModel({
            userId,
            text
        })
        const response = await todo.save();
        return res.status(201).json(response);
    }catch(e){
        res.status(400).json(e)
    }
}


const updateTodo = async (req, res) => {
    const todoId = req.params.todoId;
    try{
        const todo = await todoModel.findById(todoId);
        if(!todo){
            return res.status(400).json({msg: 'ToDo is not exists'})
        }
        todo.status = 'COMPLETED'
        await todo.save();
        res.status(400).json(todo);
    }catch(e){
        res.status(400).json(e)
    }
}

const getAllTodos = async (req, res) => {
    try{
        const inCompletedTodos = await todoModel.find({status: 'NOTCOMPLETE'})
        res.status(200).json(inCompletedTodos)
    }catch(e){
        res.status(400).json(e)
    }
    
}

module.exports = {
    createTodo,
    updateTodo,
    getAllTodos
}