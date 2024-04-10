import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Setting from './Setting';
import { useState } from 'react';


const Profile = ({ image, userName, status, handleLogOut }) => {
   const [isVisible, setIsVisible] = useState(false)
  const settingClick = ()=>{
    setIsVisible(!isVisible)
  }
    return ( 
        <div className="profile">
            <div className="profile_image">
              <img className="img" src={image} alt="" />
            </div>
            <div className="profile_content">
                <strong>{userName}</strong>
                <p>{status}</p>
            </div>
            <div className="profile_setting" onClick={settingClick}>
              <FontAwesomeIcon icon={faGear}/>
            </div>
            {isVisible && (
              <Setting handleClick={handleLogOut}/>
            )}
        </div>
     );
}
 
export default Profile;