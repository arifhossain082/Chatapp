const router = require('express').Router()
const {createTodo, updateTodo, getAllTodos} = require('../controller/todoController')

router.post('/', createTodo);
router.put('/:todoId', updateTodo)
router.get('/', getAllTodos)

module.exports = router;
