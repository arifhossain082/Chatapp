import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Items = ({icon, text, handleClick}) => {
    return ( 
        <div className="item" onClick={handleClick}>
                <FontAwesomeIcon icon={icon} />
                <h4>{text}</h4>
              </div>
     );
}
 
export default Items;