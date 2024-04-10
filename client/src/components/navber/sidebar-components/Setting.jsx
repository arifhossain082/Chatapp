import Button from "../../button/Button";

const Setting = ({handleClick}) => {
    return ( 
        <div className="setting">
            <Button handleClick={handleClick} text={'Logout'}/>
        </div>
     );
}
 
export default Setting;