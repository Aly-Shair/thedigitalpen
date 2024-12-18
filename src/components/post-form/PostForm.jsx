// ﷺ
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Button, RTE } from "../index.js";
import configService from "../../appwrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setPosts } from "../../store/postSlice.js";

export default function PostForm({ post }) {

  const dispatch = useDispatch();

  const { register, handleSubmit, getValues, setValue, watch, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.description || "",
        status: post?.status || false,
      },
    });
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    if (post) {
      console.log("POst ha update ka leya");
      console.log("POst ha update ka leya");
      console.log("POst ha update ka leya");
      console.log("POst ha update ka leya");
      
      const file = data.image[0]
        ? await configService.uploadFile(data.image[0])
        : null;
      if (file) {
        await configService.deleteFile(post.featuredImageId);
      }
      const dbpost = await configService.updatePost(post.$id, {
        ...data,
        featuredImageId: file?.$id,
        userId: userData?.$id,
        status: getValues('status') === "Active" ? true : false,
      });
      
      if (dbpost) {

        configService.listPosts().then((posts)=>{
          
          if(posts){
            dispatch(setPosts(posts.documents));
            // console.log(posts.documents);
          }
          
        }).then(()=>{
          navigate(`/post/${post.$id}`);
        })

      }
    
    } else {
      console.log("this is " + userData);
      const file = await configService.uploadFile(data.image[0]);
      // console.log(file);
      if (file) {
        const fileId = file.$id;
        data.featuredImageId = fileId;
        const postCreated = await configService.createPost({
          ...data,
          userId: userData?.$id,
          status: getValues('status') === "Active" ? true : false,
          // status: "Active" ? true : false,
        });
        if (postCreated) {


          configService.listPosts().then((posts)=>{
          
            if(posts){
              dispatch(setPosts(posts.documents));
              // console.log(posts.documents);
            }
            
          }).then(()=>{
            navigate(`/post/${postCreated.$id}`);
          })


        }
      }
    }


    


  };

  const slugTransform = (value) => {
    if (value && typeof value === "string")
      return value.toLowerCase().replace(/ /g, "-");
  };
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create Post</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <Input
                label="Title"
                type="text"
                placeholder="Enter title"
                required
                {...register("title", {
                  required: true,
                })}
              />
            </div>

            <div className="mb-3">
              <Input
                label="Slug"
                type="text"
                placeholder="Enter slug"
                readOnly
                {...register("slug", {
                  required: true,
                })}
              />
            </div>

            <div className="mb-3">
              <RTE
                label="Description"
                name="description"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <Input
                label="Upload File"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                  required: !post,
                })}
              />
            </div>

            {post && (
              <div className="mb-3">
                <img
                className="w-100"
                  src={`${configService.getFilePreview(post.featuredImageId)}`}
                />
              </div>
            )}

            <div className="mb-3">
              <Select
                label="Status"
                options={["Active", "UnActive"]}
                {...register("status", {
                  required: true,
                })}
              />
            </div>

            <div className="mb-3 text-center">
              <Button type="submit" value="Submit" className="btn-outline-secondary w-100" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
