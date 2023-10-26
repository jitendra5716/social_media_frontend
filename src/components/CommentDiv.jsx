import { useEffect, useState } from "react";
import style from "../styles/commentDiv.module.css";
// import { useDispatch } from "react-redux";
// import { deleteComment } from "../redux/commentReducer";
// import { getAllPost } from "../redux/postReducer";

const CommentDiv = ({comment,userId,deleteCount,setDeleteCount,handleDltCmt})=>{
    // const [change,setChange] = useState(false);
    // console.log(comment);
    

    // useEffect(()=>{
    //     dispatch(getAllPost());
    // },[deleteCount]);

    



    return(
        <>
        <div className={style.outerDiv}>
            <div className={style.imgDiv}>
                <img src={comment.user.image} />
            </div>
            <div className={style.innerDiv}>
                <h4>
                    {comment.user.name}
                    <span>
                        {
                            userId===comment.user._id && <svg onClick={()=>handleDltCmt({id:comment._id,post:comment.post._id,user:comment.user._id})} xmlns="http://www.w3.org/2000/svg" fill="red" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                        }
                    
                    </span>
                </h4>
                
                <p>
                    
                    {comment.content}
                </p>
                
            </div>
            
        </div>
        </>
    )
};

export default CommentDiv;