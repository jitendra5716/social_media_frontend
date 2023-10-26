import style from "../styles/updateprofile.module.css";
import { useSelector } from "react-redux";
import { userDataSelector } from "../redux/userDataReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "../redux/userReducer";
import { getAllPost } from "../redux/postReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

const UpdateProfile = ({userProfile,setUserProfile})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userDataSelector);
    const userId = user._id;
    const [count,setCount] = useState(0);
    const [updatedData,setUpdatedData] = useState();
    const handleChange = (e)=>{
        setUpdatedData({...updatedData,[e.target.name]:e.target.value});
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(updatedData);
        dispatch(updateUserData({userId,updatedData}));
        toast.success("Profile Updated Successfully!");
        setCount(count+1);
        navigate('/');
    }

    useEffect(()=>{
        dispatch(getAllPost())
        
    },[count]);

    useEffect(()=>{
        let val = document.cookie;
        // console.log(val);
        let orgToken = val.slice(6);
        // console.log(orgToken);
    
        axios.get('http://localhost:8000/user/profile',{
            headers: {
                Authorization: `${orgToken}`,
              },
        }).then(data=>{
          setUserProfile(data.data);
        //   setOrgUser(data.data);
          }
          );
        // console.log(userData);
      },[count]);
    
    return(
        <>
        <div className={style.outerDiv}>
            <div className={style.innerDiv}>
                <div className={style.infoDiv}>
                    <div className={style.imgDiv}>
                        <img src={user.image} />
                    </div>
                    <h2>
                        {user.name}
                    </h2>
                    <h3>
                        {user.email}
                    </h3>
                </div>
                <div className={style.updateDiv}>
                <form >
                    {/* <div> */}
                        <label htmlFor="name">Update Name :</label>
                        <input type="text" name="name" onChange={handleChange} id="name" />
                    {/* </div> */}
                    {/* <div> */}
                        <label htmlFor="image">Update Image :</label>
                        <input type="text" onChange={handleChange} name="image" id="image"/>
                    {/* </div> */}
                    <button type="submit" onClick={handleSubmit} className={style.btn}>Update Profile</button>
                </form>
                </div>
                
            </div>
        </div>
        </>
    )
};

export default UpdateProfile;