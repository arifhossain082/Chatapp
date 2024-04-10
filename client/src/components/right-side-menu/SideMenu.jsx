import { faSearch, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";
import Items from "./Items";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";

const SideMenu = () => {
  const {insertTodo, todos, updateTodo} = useContext(ChatContext);
  const [isTodoVisible, setIsTodoVisible] = useState(false)
  const [todoText, setTodoText] = useState('');
    const handleOftask = () => {
      setIsTodoVisible(!isTodoVisible)
    }
    return ( 
        <div className="side-menu">
            <div className="list-of-menu">
              <Items icon={faSearch} text={'Search'} handleClick={handleOftask}/>
              <Items icon={faCalendarCheck} text={'ToDo'} handleClick={handleOftask}/>
            </div>
            {isTodoVisible && (
              <Todo setHide={setIsTodoVisible} setTodoText={setTodoText} text={todoText} insertTodo={insertTodo} allTodos={todos} updateTodo={updateTodo}/>
            )}
        </div>
     );
}
 
export default SideMenu;