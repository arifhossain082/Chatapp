import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Button = ({text, handleClick, icon = '', style, type=''}) => {
    
    return (  
        <div className="button">
            <button style={style} type={type} onClick={handleClick}>{text} {!icon === '' && (<FontAwesomeIcon icon={icon} />)}</button>
            
        </div>
    );
}
 
export default Button;