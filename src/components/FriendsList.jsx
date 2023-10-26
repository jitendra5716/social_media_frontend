import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/userReducer";
import { useEffect } from "react";
import style from "../styles/friendsList.module.css";
import { allUsersSelector } from "../redux/userReducer";
import { Link } from "react-router-dom";
import { friendProfile } from "../redux/userReducer";

const FriendsList = ({userLogged,setUserLogged})=>{
    const dispatch = useDispatch();
    const users = useSelector(allUsersSelector);
    // console.log(users)

    useEffect(()=>{
        dispatch(getAllUsers());
    },[]);

    const handleClick = (id)=>{
        // console.log(id);
        dispatch(friendProfile(id));
    }
    
    return(
        <>
        <h3 className={style.heading}>
            Friends
        </h3>
        {
            userLogged || <h2 style={{textAlign:"center"}}>
                login to see your friends list
            </h2>
        }
        <div className={style.friendsDiv}>
            {
                userLogged && users && 
                <ul>
                {
                    users && users.map((user,i)=>(
                        
                        <li key={i}>
                            <div className={style.profileDiv}>
                                <img src={user.image} />
                            </div>
                            <Link onClick={()=>handleClick(user._id)} to={`/friend/${user._id}`}>
                            {user.name}
                            </Link>
                        </li>
                        // </Link>
                    ))
                }
            </ul>
            }
            
        </div>
        </>
    )
};

export default FriendsList;