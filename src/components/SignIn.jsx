import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers, getProfile, setInitial, userSelector } from "../redux/userReducer";
import { useDispatch } from "react-redux";
import { signinUser } from "../redux/userReducer";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../styles/signin.module.css";

const SignIn = ({setUserLogged,setUserProfile,userProfile})=>{

    const [user,setUser] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count,setCount] = useState(0);
    // const [userProfile,setUserProfile] = useState();
    
    // console.log(userProfile);
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const data = await dispatch(signinUser(user));
            
            // console.log(data);
            if(data.payload.error){
                return toast.error(data.payload.error);
            }
            if(data.payload.token){
                // console.log(data.payload.token);
                toast.success("Login Success");
                await dispatch(getProfile(data.payload.token));
                await dispatch(getAllUsers());
                setUserLogged(true);
                navigate('/');
                setCount(count+1);
            }
            // navigate('/');

        }catch(err){
            return console.log("Error in logging the user",err);
        }
    }


    // console.log(userProfile);
    const fetchData = async()=>{
        let val = document.cookie;
        let orgToken = val.slice(6);
        // const userData = await dispatch(signinUser(user));
        let {data} = await axios.get('http://localhost:8000/user/profile',{
            headers: {
                Authorization: `${orgToken}`,
              },
        })
        setUserProfile(data);
        if(data.email){
            setUserLogged(true);
            navigate('/')
          }else{
            setUserLogged(false);
          }
    }
    // useEffect(()=>{
    //     console.log("abcd");
    //     fetchData();
    //   },[handleSubmit]);
      useEffect(()=>{
        fetchData();
        // console.log(count);
      },[count])

    return(
        <>
        <div className={style.outerMostDiv}>
        <section id={style.sectionDiv} class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center ml-24 justify-center  mx-auto md:h-screen lg:py-0">
      <a  class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Codeial    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login an account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                    
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your email" required="" onChange={handleChange}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange}/>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Login </button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
<div className={style.outerDiv}>
      <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?size=626&ext=jpg&ga=GA1.1.134552255.1697800348&semt=ais" alt="" />
</div>
</div>
        </>
    )
};

export default SignIn;