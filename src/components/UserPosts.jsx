import style from "../styles/userposts.module.css";
// import { useSelector } from "react-redux";
// import { postSelector } from "../redux/postReducer";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { createComment } from "../redux/commentReducer";
import CommentDiv from "./CommentDiv";
// import { getAllPost } from "../redux/postReducer";
// import { createLike } from "../redux/likeReducer";
// import { createHeart } from "../redux/heartReducer";


const UserPosts = ({content, imgUrl, user,postId,likes,hearts,comments,post,userProfile,setUserProfile,count,setCount,likeCount,setLikeCount,heartBtn,setHeartBtn})=>{

    // const dispatch = useDispatch();
  const [openCommDiv,setOpenCommDiv] = useState(false);
  const[heartBtnC,setHeartBtnC] = useState(false);
  const [likeBtn,setLikeBtn] = useState(false);
  // let userId = userProfile && userProfile._id;
  // let [userComment,setUserComment] = useState({
  //   content:"",
  //   user:userId,
  //   post:postId
  // });

  // let [like,setLike] = useState({
  //   user:userId,
  //   post:postId
  // })

  // const handleChange = (e)=>{
  //   setUserComment({
  //       content:e.target.value,
  //       user:userId,
  //       post:userComment.post
  //   })
  // }

  

  // const handleClick = (e)=>{
  //   e.preventDefault();
  //   setCount(count+1);
  //   dispatch(createComment(userComment));
  //   setUserComment({content:"",user:userComment.user,post:userComment.post});
    
  // }

  

  const handleCommDiv = ()=>{
    setOpenCommDiv(!openCommDiv);
  }


const timestamp = "2023-10-21t21:09:19.661z";
  const date = new Date(timestamp);
  
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);

    return(
        <>
         <div className={style.outerDiv}>
        <div className={style.headingDiv}>
          <div className={style.profileDiv}>
            {user && <img src={user.image} />}
          </div>
          <div className={style.titleDiv}>
            <p>{content}</p>
            <small>{formattedDate.slice(0,-4)}</small>
          </div>
          <span>{user && user.name}</span>
        </div>

        <div className={style.imgDiv}>
          <img src={imgUrl} />
        </div>
        {/* { */}
           <div className={style.likeContainer}>
          <div className={style.svgDiv}>
            <div className={style.likeDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill={likeBtn?"blue":""}
                // onClick={handleLikeBtn}
              >
                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
              </svg>
              <span>{likes.length}</span>
            </div>
            <div className={style.likeDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                fill={heartBtnC?"red":""}
                className={style.heart}
                viewBox="0 0 512 512"
                // onClick={handleHeartBtn}
              >
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
              </svg>
              <span>{hearts.length}</span>
            </div>
            <div className={style.likeDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                fill={openCommDiv?"blue":""}
                viewBox="0 0 512 512"
                onClick={handleCommDiv}
                // onChange={handleLikeChange}
              >
                <path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" />
              </svg>
              <span>{comments.length}</span>
            </div>
          </div>
          {/* <div className={style.commentDiv}>
            <form action="">
              <input
                type="text"
                placeholder="Comment here...."
                name="content"
                onChange={handleChange}
                value={userComment.content}
              />
              <button type="submit" onClick={handleClick} className={style.btn}>
                Comment
              </button>
            </form>
          </div> */}
        </div>
        {/* } */}
        
        {
         openCommDiv && comments.length>0 && 
          <div className={style.commentsDiv}>
            {comments.map((comm,i)=>(<CommentDiv key={i} comment={comm}/>))}
        </div>
        }
        
      </div>
        </>
    )
};

export default UserPosts;