import style from "../styles/friendprofile.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { friendSelector, userSelector } from "../redux/userReducer";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FriendProfile = ()=>{
    const friendData = useParams();
    const navigate = useNavigate();
    // console.log(friendData);
    const userProfile = useSelector(userSelector);
    // console.log(userProfile);

    const handleFriendRequest = (e)=>{
        e.preventDefault();
        toast.success("Friend Request Sent!");
        navigate('/');
    }

    return(
       <>
        <div className={style.outerDiv}>
            <div className={style.innerDiv}>
                <div className={style.imgDiv}>
                    {userProfile &&
                    <>
                    <div className={style.profileDiv}>
                        <img src={userProfile.image} />
                    </div>
                    <div className={style.profileDesc}>
                        <h1>
                            {userProfile.name}
                        </h1>
                        <h2>
                            {userProfile.email}
                        </h2>
                    </div>
                    </>
                     } 
                </div>
                <div className={style.descDiv}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, magni voluptatum possimus earum eligendi veniam, id aspernatur distinctio doloremque voluptatibus, enim animi illum facere facilis iure voluptate placeat alias atque! Assumenda perspiciatis illo iusto doloremque veritatis libero sit, provident sint? Similique, labore nobis dolor non quod qui illo molestias tempore, dolorum modi possimus id esse.
                    </p>
                    <h4>
                        {userProfile && userProfile.name}
                    </h4>
                    <div className={style.btnDiv}>
                        <Link to="/profile">
                          <p id={style.viewMore}>
                          View More &rarr;
                            </p>  
                        </Link>
                        <button id={style.info} onClick={handleFriendRequest} className={style.btn}>
                            Send Friend Request
                        </button>
                        {/* <button id={style.delete} className={style.btn}>
                            Delete Profile
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
       </>
    )
};

export default FriendProfile;