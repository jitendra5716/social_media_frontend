import style from "../styles/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/userReducer";
import { useEffect, useState } from "react";
import axios from "axios";
import FriendsList from "./FriendsList";
import PostInput from "./PostInput";
import { postLoading, postSearchData, postSelector } from "../redux/postReducer";
import PostDiv from "./PostDiv";
import { getAllPost } from "../redux/postReducer";
import ExtraInfo from "./ExtraInfo";
import { allPostSelector } from "../redux/postReducer";
import { toast } from "react-hot-toast";

const Home = ({userLogged,setUserLogged,userProfile,setUserProfile})=>{
    const user = useSelector(userSelector);
    const [count,setCount] = useState(0);
    const [postChange,setPostChange] = useState(false);
    let [likeCount,setLikeCount] = useState(false);
    let [heartBtn,setHeartBtn] = useState(false);
    const[heartBtnC,setHeartBtnC] = useState(false);
    const allPosts = useSelector(allPostSelector);
    const postsLoading = useSelector(postLoading);
//   console.log(allPosts);
    const [deleteCount,setDeleteCount] = useState(0);
    const searchData = useSelector(postSearchData);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllPost());
    },[count]);
    // console.log(userProfile);

    if(postsLoading){
        console.log(postsLoading);
        // toast.success("Loading");
    }
    
    return(
        <>
        
        <div className={style.mainContainer}>
            <div className={style.divOne}>
                {
                    !userLogged && 
                
                <div className={style.mapDiv}>
                    <img src="https://media.istockphoto.com/id/1202864734/photo/location-pin-nevigation-icons-on-world-map-polygon-graphic-background-with-connected-lines.jpg?s=612x612&w=0&k=20&c=PTFNNpmgbkWr_-QLIwCW2p9sZW8ESHFOjvnjX856U64="/>
                </div>
}
            <ExtraInfo />
            </div>
            <div className={style.divSecond}>
            {
                userLogged && <PostInput userProfile={userProfile} setUserProfile={setUserProfile}/>
            }
            {/* {
            postsLoading && 
            <div className={style.loadingDiv}>
                <h1>
                Loading... 
            </h1>
            </div>
            
        } */}
            <div className={style.postDiv}>
                
               {
                allPosts && allPosts.filter((pst)=>{
                    if(searchData.length==0){
                        return pst;
                    }else{
                        return pst.content.toLowerCase().includes(searchData.toLowerCase());
                    }
                }).map((post,i)=>(
                    <PostDiv key={i} heartBtnC={heartBtnC} setHeartBtnC={setHeartBtnC} heartBtn={heartBtn} setHeartBtn={setHeartBtn} post={post} likeCount={likeCount} setLikeCount={setLikeCount} count={count} setCount={setCount}  hearts={post.hearts} likes={post.likes} comments={post.comments} postId={post._id} content={post.content} user={post.user} userProfile={userProfile} postChange={postChange} setPostChange={setPostChange} deleteCount={deleteCount} setDeleteCount={setDeleteCount} setUserProfile={setUserProfile} imgUrl={post.imgUrl}/>
                ))
               } 
            </div>
            </div>
            <div className={style.divThree}>
            <FriendsList userLogged={userLogged} setUserLogged={setUserLogged}/>
</div>
        </div>
        
        
        
        </>
    )
};

export default Home;