import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "../index";
import { useForm } from "react-hook-form";
import configService from "../../appwrite/config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { setComments } from "../../store/commentSlice";
import { useDispatch } from "react-redux";

export default function CommentForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const addComment = async (data) => {
    console.log(userData);
    if (!data.comment && !data.commentImage.length) {
      // Set a custom error if both fields are empty
      setError("form", {
        type: "manual",
        message: "Please provide a comment or upload an image.",
      });
      return;
    }

    clearErrors("form"); // Clear the error if validation passes

    // console.log(data)
    if (data) {
      if (data.comment && data.commentImage.length) {
        const image = await configService.uploadCommentImage(
          data.commentImage[0]
        );
        const comment = await configService.createComment({
          comment: data.comment,
          postId: id.toString(),
          userId: userData.$id,
          commentImageId: image.$id.toString(),
          userName: userData.name
        });
      } else if (data.comment && !data.commentImage.length) {
        const comment = await configService.createComment({
          comment: data.comment,
          postId: id.toString(),
          userId: userData.$id,
          commentImageId: undefined,
          userName: userData.name
        });
      } else if (!data.comment && data.commentImage.length) {
        const image = await configService.uploadCommentImage(
          data.commentImage[0]
        );
        const comment = await configService.createComment({
          comment: null,
          postId: id.toString(),
          userId: userData.$id,
          commentImageId: image.$id.toString(),
          userName: userData.name
        });
      }
    }
    
    reset();

    configService.getComments().then((comments) => {
      if (comments) {
        dispatch(setComments(comments.documents));
      }
    });

  };

  return (
    <form id="add-comment-form" onSubmit={handleSubmit(addComment)}>
      <div className="mb-3">
        <Textarea
          // label="Your Comment:"
          placeholder="Write your comment here..."
          {...register("comment", {
            required: false,
          })}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Upload File"
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          {...register("commentImage", {
            required: false,
          })}
        />
      </div>
      <Button
        type="submit"
        className="btn btn-success"
        value={"Post Comment"}
      />

      <p className="text-danger mt-2">{errors.form?.message}</p>
    </form>
  );
}
