import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header, Footer, Hero } from "./components/index";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";

import { setPosts } from "./store/postSlice";
import configService from "./appwrite/config";


import { setComments } from "./store/commentSlice";
import { setReplys } from "./store/commentsReplySlice";

function App() {

  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
        // additional for postSlice
        configService.listPosts().then((posts)=>{
          
          if(posts){
            dispatch(setPosts(posts.documents));
            // console.log(posts.documents);
          }
          
        })
        //

        configService.getComments().then((comments)=>{
          if(comments){
            dispatch(setComments(comments.documents))
          }
        }).then(()=>{
          configService.listReplys().then((replys)=>{
            if(replys){
              dispatch(setReplys(replys.documents))
            }
          })
        })
      }
    }).finally(()=>{
      setLoader(false)
    })
  },[])


  return loader?null: (
    <div >
      <Header />
      <main className="min-vh-100 d-flex justify-content-center align-items-center">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
