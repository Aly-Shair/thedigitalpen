import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configService from "../appwrite/config.js";
import parse from "html-react-parser";
import { Button } from "../components/index.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setPosts } from "../store/postSlice.js";

import CommentForm from "../components/CommentForm/CommentForm.jsx";
import { Comment } from "../components/index.js";

export default function Post() {
  const dispatch = useDispatch();

  // const [post, setPost] = useState({});
  // const { id } = useParams();
  // // console.log(id);
  // const [postUrl, setPostUrl] = useState("");
  // const navigate = useNavigate();
  // const [author, setAuthor] = useState(false);
  // const userid = useSelector(state => state.auth.userData.$id);

  // useEffect(() => {
  //   if (id) {
  //     const fetchPost = async () => {
  //       const post = await configService.getPost(id);
  //       if (post) {
  //         setPost(post);
  //         const url = configService.getFilePreview(post.featuredImageId);
  //         if (url) {
  //           setPostUrl(url);
  //           // console.log(postUrl);
  //         }

  //         if(post.userId === userid){
  //           setAuthor(true);
  //         }else{
  //           setAuthor(false);
  //         }
  //       }else{
  //         navigate('/')
  //       }
  //       // console.log(post);
  //       // console.log(typeof post.description); // it gives string
  //     };
  //     fetchPost();
  //   }
  // }, [id]);

  const { id } = useParams();
  const [post, setPost] = useState({});
  const reduxPost = useSelector((state) =>
    state.post.posts.find((post) => post.$id == id)
  );

  // console.log(id);
  // console.log(post);
  const [postUrl, setPostUrl] = useState("");
  const navigate = useNavigate();
  const [author, setAuthor] = useState(false);
  const userid = useSelector((state) => state.auth.userData.$id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const backendPost = await configService.getPost(id);
        if (backendPost) {
          setPost(backendPost);
          const url = configService.getFilePreview(backendPost.featuredImageId);
          setPostUrl(url);
          setAuthor(backendPost.userId === userid);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    };

    if (reduxPost) {
      setPost(reduxPost);
      const url = configService.getFilePreview(reduxPost.featuredImageId);
      if (url) {
        setPostUrl(url);
      }

      if (post.userId === userid) {
        setAuthor(true);
      } else {
        setAuthor(false);
      }
    } else {
      // navigate("/");
      fetchPost();
    }
  }, [id, post, userid]);

  const deletePost = () => {
    try {
      configService.deletePost(id).then((status) => {
        if (status) {
          configService.deleteFile(post.featuredImageId).then(() => {
            navigate("/all-posts");
          });
        }

        configService.listPosts().then((posts) => {
          if (posts) {
            dispatch(setPosts(posts.documents));
            // console.log(posts.documents);
          }
        });
      });
    } catch (error) {}
  };

  const comments = useSelector(state => state.comment.comments.filter(comment => comment.postId.toString() === id.toString()))
    
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <img
              src={`${postUrl}`}
              className="card-img-top img-fluid"
              alt="Post Image"
            />
            <div className="card-body">
              <h2 className="card-title">{post?.title}</h2>
              <div className="card-text">
                {post?.description && parse(post.description)}
              </div>
              {author && (
                <div className="d-flex justify-content-end">
                  <Link to={`/edit-post/${id}`}>
                    <Button
                      value={"Edit"}
                      className="btn btn-outline-secondary me-2"
                    />
                  </Link>

                  <Button
                    value={"Delete"}
                    className="btn btn-outline-danger"
                    onClick={deletePost}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container border p-3 rounded mt-5 ">
        <h3 className="text-center text-uppercase fw-bold text-secondary">
          Add a Comment
        </h3>
        <CommentForm />
      </div>
      <div className="cart-title my-5">
        <h3 className="card-title mb-5 text-center text-uppercase fw-bold text-secondary">
          All Comments
        </h3>
        <div className="container">
          {
            comments.length > 0?(
              comments.map((comment)=>(
                  <div className="card-body" key={comment.$id}>
                  <Comment  {...comment}/>
                </div>
              ))
            ):(
              <h3 className="container text-center">
                no comments
              </h3>
            )
          }
        </div>
      </div>
    </div>
  );
}
