import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";
import { signupUser } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import style from "../styles/signup.module.css";

const SignUp = ()=>{

    const [user,setUser] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxUser = useSelector(userSelector);
    
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const data = await dispatch(signupUser(user));
            // console.log(data);
            if(data.payload.error){
                toast.error(data.payload.error);
                
            }else if(data.payload._id){
                toast.success('Successfully Register');
                navigate('/signIn');
            }
            
        }catch(err){
            return console.log("error in creatin user",err);
        }
        
    }

    return(
        <>
        <div className={style.outerMostDiv}>
       
        <section id={style.sectionDiv} className=" mt-24 dark:bg-gray-900">
  <div className="flex flex-col items-center ml-20 justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
      {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Codeial   
      </a> */}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required="" onChange={handleChange}/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your email" required="" onChange={handleChange}/>
                  </div>
                  <div>
                      <label htmlFor="imgUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                      <input type="text" name="image" id="imgUrl" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your email" required="" onChange={handleChange}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange}/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="confirm_password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange}/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button onClick={handleSubmit} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to="/signIn">Login here</Link> </a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
<div className={style.outerDiv}>
      <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?size=626&ext=jpg&ga=GA1.1.134552255.1697800348&semt=ais" alt="" />
</div>
</div>
        </>
    )
};

export default SignUp;