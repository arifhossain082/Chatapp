import { faSearch, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import Items from "./Items";
const SideMenu = () => {
    const handleOftask = () => {}
    return ( 
        <div className="side-menu">
            <div className="list-of-menu">
              <Items icon={faSearch} text={'Search'} handleClick={handleOftask}/>
              <Items icon={faCalendarCheck} text={'ToDo'} handleClick={handleOftask}/>
            </div>
        </div>
     );
}
 
export default SideMenu;