import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'

const Profile = ({ image, userName, status }) => {
    return ( 
        <div className="profile">
            <div className="profile_image">
              <img className="img" src={image} alt="" />
            </div>
            <div className="profile_content">
                <strong>{userName}</strong>
                <p>{status}</p>
            </div>
            <div className="profile_setting">
              <FontAwesomeIcon icon={faGear}/>
            </div>
        </div>
     );
}
 
export default Profile;