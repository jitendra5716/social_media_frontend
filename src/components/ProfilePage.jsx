import { Link } from "react-router-dom";
import style from "../styles/profilepage.module.css";
import UserPosts from "./UserPosts";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { userData, userSelector, userSelfSelector } from "../redux/userReducer";
import { postSelector } from "../redux/postReducer";
import { useDispatch } from "react-redux";
import { getAllPost } from "../redux/postReducer";
import { userDataSelector } from "../redux/userDataReducer";
import { userSelfData } from "../redux/userDataReducer";
import { deleteUser } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../redux/userReducer";
import {toast} from "react-hot-toast";

const ProfilePage = ({userProfile})=>{
    // console.log(userProfile);
    const navigate = useNavigate();
    const user = useSelector(userDataSelector);
    // console.log(user);
    const [count,setCount] = useState(0);
    let [likeCount,setLikeCount] = useState(false);
    let [heartBtn,setHeartBtn] = useState(false);
    const[heartBtnC,setHeartBtnC] = useState(false);
    const {allPosts} = useSelector(postSelector);
    const dispatch = useDispatch();
    const [deleteCount,setDeleteCount] = useState(0);
    

    const uId = userProfile && userProfile.id;

    const handleUpdateInfo = ()=>{
        dispatch(userSelfData({id:userProfile && userProfile.id}))
    }
    const handleDelete = async()=>{
        // console.log(uId);
        const res = await window.confirm("Want to delete Profile");
        // console.log(res);
        if(res){
            await dispatch(deleteUser(uId));
            await dispatch(signOutUser());
            await navigate('/signIn');
            await toast.success("Profile Deleted Successfully!");
            await setDeleteCount(deleteCount+1);
        }else{
            await navigate('/profile');
        }
    }
    // useEffect(()=>{
    //     navigate('/');
    // },[deleteCount]);

    return(
        <>
        {/* <h1>userProfile.name</h1> */}
        {/* <img src={userProfile.image}/> */}
        <div className={style.outerDiv}>
            <div className={style.innerDiv}>
                <div className={style.imgDiv}>
                    {userProfile &&
                    <>
                    <div className={style.profileDiv}>
                        <img src={user.image} />
                    </div>
                    <div className={style.profileDesc}>
                        <h1>
                            {user.name}
                        </h1>
                        <h2>
                            {user.email}
                        </h2>
                    </div>
                    </>
                    }
                </div>
                <div className={style.descDiv}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, magni voluptatum possimus earum eligendi veniam, id aspernatur distinctio doloremque voluptatibus, enim animi illum facere facilis iure voluptate placeat alias atque! Assumenda perspiciatis illo iusto 
                    </p>
                    <h4>
                        {user.name}
                    </h4>
                    <div className={style.btnDiv}>
                        {/* <Link to="/profile">
                          <p id={style.viewMore}>
                          View More &rarr;
                            </p>  
                        </Link> */}
                        <Link to={`update/${uId}`}>
                        <button onClick={handleUpdateInfo} id={style.info} className={style.btn}>
                            Update Info
                        </button>
                        </Link>
                        
                        <button id={style.delete} onClick={handleDelete} className={style.btn}>
                            Delete Profile
                        </button>
                    </div>
                </div>
            </div>
            {
                 user.posts.length===0 && 
                 <div className={style.noPost}>

                    <h1>
                        Your Post is Empty <br />
                         to Create New Post <br />
                         visit Home Page
                        
                    </h1>
                    </div>
            }
            <div className={style.innerContainerTwo}>
                {
                   user && user.posts.map((post,i)=>(
                        <UserPosts key={i} post={post} heartBtnC={heartBtnC} setHeartBtnC={setHeartBtnC} heartBtn={heartBtn} setHeartBtn={setHeartBtn} likeCount={likeCount} setLikeCount={setLikeCount} count={count} setCount={setCount}  hearts={post.hearts} likes={post.likes} comments={post.comments} postId={post._id} content={post.content} user={post.user} imgUrl={post.imgUrl}/>
                    ))
                }
                    {/* <UserPosts /> */}
            </div>
        </div>
        </>
    )
};

export default ProfilePage;