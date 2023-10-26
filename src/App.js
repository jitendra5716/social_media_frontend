import Navbar from "./components/Navbar";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useState,useEffect } from "react";
import axios from "axios";
import ProfilePage from "./components/ProfilePage";
import { allPostSelector, getAllPost } from "./redux/postReducer";
import { useDispatch } from "react-redux";
import FriendProfile from "./components/FriendProfile";
import { userData } from "./redux/userReducer";
import UpdateProfile from "./components/UpdateProfile";
import { userSelfData } from "./redux/userDataReducer";
import { useSelector } from "react-redux";

function App() {

  const [userProfile, setUserProfile] = useState();
  const [userLogged, setUserLogged] = useState(false);
  const dispatch = useDispatch();
  const[stopC,setStopC] = useState(0);
  const allPosts = useSelector(allPostSelector)
  // console.log(allPosts);
  
  useEffect(()=>{
    dispatch(getAllPost());
  },[])
  useEffect(()=>{

  })
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
        // console.log(data.data);
        if(data.data.email){
          setUserLogged(true);
        }else{
          setUserLogged(false);
        }
        
        }
        );
    },[]);

    useEffect(()=>{
      dispatch(userSelfData({id:userProfile && userProfile.id}));
    },[]);

    useEffect(()=>{
      dispatch(getAllPost())
    },[]);

    // console.log()

  const router = createBrowserRouter([{
    path:'/',element:<Navbar stopC={stopC} setStopC={setStopC} userLogged={userLogged} setUserLogged={setUserLogged} userProfile={userProfile}/>,children:[
      {
        index:true ,element:<Home userLogged={userLogged} setUserLogged={setUserLogged} setUserProfile={setUserProfile} userProfile={userProfile}/>
      },
      {
        path:'/signUp', element:<SignUp />
      },
      {
        path:'/signIn', element:<SignIn setUserProfile={setUserProfile} userProfile={userProfile} userLogged={userLogged} setUserLogged={setUserLogged}/>
      },
      {path:'/profile',element:<ProfilePage userProfile={userProfile} />},{
        path:'/friend/:id',element:<FriendProfile />
      },
      {path:'/profile/update/:id', element:<UpdateProfile userProfile={userProfile} setUserProfile={setUserProfile} />}
    ]
  }]);
  return (
    <>
    <Provider store={store}>
    <Toaster position="top-right" toastOptions={{duration:2000} } reverseOrder={true} />
    <RouterProvider router={router}>
    
    </RouterProvider>
    </Provider>
    </>
  );
}

export default App;
