import { useState } from "react";
import style from "../styles/postinput.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/postReducer";
import { useRef,useEffect } from "react";
import { getAllPost } from "../redux/postReducer";
import axios from "axios";
import { userDataSelector } from "../redux/userDataReducer";
import { useSelector } from "react-redux";
import {toast} from "react-hot-toast";

const PostInput = ({userProfile,setUserProfile})=>{
    // const firstInputRef = useRef(null);
    const userinfo = useSelector(userDataSelector);
    let [count,setCount] = useState(0);
    let [orgUser,setOrgUser] = useState();
    // console.log(userProfile._id);
    const [content,setContent] = useState();
    const [imgUrl,setImgUrl] = useState();
    const [user,setUser] = useState();
    const [userData,setUserData]= useState({
        content:"",
        imgUrl:"",
        user:userProfile && userProfile.id,
    })
    const dispatch = useDispatch();
    const handleContent = (e)=>{
        setContent(e.target.value);
        setUserData({
            content:e.target.value,
            imgUrl:userData.imgUrl,
            user:userData.user
        })
    }
    const handleImgUrl = (e)=>{
        setImgUrl(e.target.value);
        setUserData({
            content:userData.content,
            imgUrl:e.target.value,
            user:userData.user
        })
    }
    const handleUser = (e)=>{
        // console.log(e.target.value);
        setUser(e.target.value);
        setUserData({
            content:userData.content,
            imgUrl:userData.imgUrl,
            user:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        // console.log(userData);
        dispatch(createPost(userData));
        toast.success("Post Created Successfully!");
        // setUserData({content:"",imgUrl:""});   
        setContent("");
        setImgUrl("");    
        setCount(count+1);
    }
    useEffect(()=>{
        // console.log(count)
        dispatch(getAllPost());
      },[count])

    useEffect(()=>{
        setCount(0);
        
      },[])

    //   useEffect(()=>{
        
    //   },[count]);

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
          setOrgUser(data.data);
          }
          );
        // console.log(userData);
      },[count]);


    // useEffect(() => {
    //     // Step 4: Use ref.current.focus() to focus on the input
    //     if (firstInputRef.current) {
    //       firstInputRef.current.focus();
    //     }
    //   }, [handleSubmit]);


    return(
        <>
        <div className={style.outerDiv}>
            <div className={style.profileDiv}>
                <div className={style.imgDiv}>
                    <img src={userinfo && userinfo.image}/>
                </div>
            </div>
            {
                userProfile &&        
        <form>
            <input  type="text" placeholder="Write something here...." required name="content" onChange={handleContent} value={content}/>
            <input type="text" placeholder="Image url....." required name="imgUrl" value={imgUrl} onChange={handleImgUrl} />
            <input type="hidden" value={userProfile && userProfile.id}  name="user" />
            <button type="submit" onClick={handleSubmit} className={style.btn}>Post</button>
        </form>
        }
        </div>
        <hr className={style.row}/>
        </>
    )
};

export default PostInput;