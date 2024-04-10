import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Todo = ({setHide, text, insertTodo, setTodoText, allTodos, updateTodo}) => {
    const {user} = useContext(AuthContext)
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [expandedTodos, setExpandedTodos] = useState([]);


    const handleInputClick = ()=> {
        setIsInputVisible(!isInputVisible);
    }

    const handleClick = ()=> {
        setHide(false);
    }

    const handleChange = (e)=> {
        setTodoText(e.target.value);
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        insertTodo(user._id, text, setTodoText);
    }

    const toggleTodo = (todoId)=> {
        setExpandedTodos(prev => {
            if (prev.includes(todoId)) {
                return prev.filter(id => id !== todoId);
            } else {
                return [...prev, todoId];
            }
        });
    };

    const todoClick = (e, todoId)=> {
        e.preventDefault();
        updateTodo(todoId);
    };
    
    return ( 
        <>
            <div className="todo">
                <div className="button-part">
                    <button className="add-todo-button" onClick={handleInputClick}>+ Todo</button>
                    <button className="add-todo-button hide" onClick={handleClick}><FontAwesomeIcon icon={faMultiply}/></button>
                </div>
                {isInputVisible && (
                    <div className="todo-form">
                        <form onSubmit={handleSubmit}>
                            <textarea className="todo-insert-field" value={text} id="" cols="5" rows="5" placeholder="Enter your todo details" onChange={handleChange}></textarea>
                            <input className="add-todo-button" type="submit" value="Add" />
                        </form>
                    </div>
                )}
                <div className="show-all-todo">
                    <ul>
                        <div className="list">
                            {allTodos.map((todo) => (
                                <li key={todo?._id} onClick={() => toggleTodo(todo._id)}>
                                    <div>
                                        <p style={{textDecoration: todo.status === 'COMPLETED' ? 'line-through' : 'none'}}>
                                            {expandedTodos.includes(todo._id) ? todo.text : todo.text.slice(0, 20)}
                                        </p>
                                        <input type="checkbox" onClick={(e) => todoClick(e, todo?._id)} name="" value={todo?._id} id="" />
                                    </div>
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}
 
export default Todo;