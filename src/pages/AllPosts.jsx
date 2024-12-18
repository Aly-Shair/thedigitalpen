import React, { useEffect, useState } from "react"
import { PostCard } from "../components/index.js"
import configService from "../appwrite/config"

import { useSelector } from "react-redux";



export default function AllPosts(){
    // const [posts, setPosts] = useState([]);
    // const [error, setError] = useState('');
    // useEffect( ()=>{
    //    const fetchPosts = async () => {
    //     try {
    //         const allPosts = await configService.listPosts();
    //        if(allPosts){
    //         setPosts(allPosts.documents);
    //         // console.log(posts)
    //        }
    //        } catch (error) {
    //         setError(error.message);
    //        }
    //    }
    //    fetchPosts();
    // },[])

    const posts = useSelector(state => state.post.posts);
    const [error, setError] = useState('');
  
    return(
    //     <div className="album py-5 bg-body-tertiary">
    //     <div className="container">
    
    //       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    //        {
    //         posts.map((post)=>(
    //             <div className="col" key={post.$id}>
    //                 <PostCard
    //                 {...post}
    //                 />
    //             </div>
    //         ))
    //        }
    //       </div>
    //     </div>
    //   </div>
    <div className="album py-5 bg-light ">
        <h1 className="text-center mb-5">All Posts</h1>
      <div className="container d-flex justify-content-center flex-wrap gap-5 w-100">
        {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4"> */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div  style={{width: "auto"}} key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="text-center w-100">
              {error ? (
                <p className="text-danger fs-5">Error: {error}</p>
              ) : (
                <p className="fs-5">No posts...</p>
              )}
            </div>
          )}
        </div>
      {/* </div> */}

                

    </div>
    )
}