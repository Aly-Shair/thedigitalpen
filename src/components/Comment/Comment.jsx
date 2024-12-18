import React, { useEffect, useState } from "react";
import configService from "../../appwrite/config";
import { Button, Input } from "../index";
import { useSelector } from "react-redux";
import { setComments } from "../../store/commentSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addReply as pushReply } from "../../store/commentsReplySlice";
import {removeReply} from '../../store/commentsReplySlice'

const Comment = ({
  comment,
  postId,
  userId,
  commentImageId,
  $id,
  userName,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isAuthor, setIsAutor] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const allReplys = useSelector((state) =>
    state.reply.replys.filter((reply) => reply.commentId == $id)
  );
  const [reply, setReply] = useState(false);
  const [isShowReplies, setIsShowReplies] = useState(false);

  const showReplies = () => {
    setIsShowReplies((prev) => !prev);
  };

  const isReply = () => {
    setReply((prev) => !prev);
  };

  const addReply = (e) => {

    e.preventDefault();
    console.log('this is comment adding');
    // const reply = document.getElementById("reply").value;
    const reply = e.target.querySelector('#reply').value;
    console.log(reply);

    if (reply.trim() === "")
     return;

    configService
      .createReply({
        reply: reply,
        userName: userData.name,
        userId: userData.$id,
        postId: postId,
        commentId: $id,
        replyImageId: null,
      })
      .then((reply) => {
        if(reply){
          dispatch(pushReply(reply));
          e.target.querySelector('#reply').value = "";
        }
      });
  };

  const deleteReply = (id) => {
    dispatch(removeReply(id))
     configService.deleteReply(id);
  }

  useEffect(() => {
    if (userId == userData.$id) {
      setIsAutor(true);
    } else {
      setIsAutor(false);
    }
  }, [userId, userData]);

  async function deleteComment() {
    console.log(commentImageId);
    if (commentImageId && comment) {
      await configService.deleteCommnetImage(commentImageId);
      await configService.deleteComment($id);
      await configService.deleteComment($id);
    } else if (comment && !commentImageId) {
      await configService.deleteComment($id);
    } else if (!comment && commentImageId) {
      await configService.deleteCommnetImage(commentImageId);
      await configService.deleteComment($id);
    }

    configService.getComments().then((comments) => {
      if (comments) {
        dispatch(setComments(comments.documents));
      }
    });
  }

  return (
    <div className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between">
        <div>
          <strong>{userName}</strong>
          {/* <small className="text-muted">2 minutes ago</small> */}
        </div>
      </div>
      {comment && <p className="mt-2 mb-2">{comment}</p>}
      <div className=" w-25 d-flex">
        {commentImageId && (
          <img
            src={configService.getCommentFilePreview(commentImageId)}
            className="img-fluid rounded mb-2"
            alt="Comment image"
          />
        )}
      </div>
      <div className="d-flex gap-2">
        {/* <button className="btn btn-sm btn-outline-primary">Edit</button>
        <button className="btn btn-sm btn-outline-danger">Delete</button> */}

        {isAuthor && (
          <div className="d-flex gap-2">
            {/* <Button
          value={"Edit"}
          className="btn btn-sm btn-outline-primary"
        /> */}
            <Button
              value="Delete"
              className="btn btn-sm btn-outline-danger"
              onClick={deleteComment}
            />
          </div>
        )}

        <button className="btn btn-sm btn-outline-secondary" onClick={isReply}>
          {reply ? "cancel" : "reply"}
        </button>
        {(allReplys.length > 0) && (
          <button
            className="btn btn-sm btn-outline-warning"
            onClick={showReplies}
          >
            {
              isShowReplies?'Close Replys':'Show Replys'
            }

          </button>
        )}
      </div>
      {reply && (
        <form action="" onSubmit={addReply}>
          <div class="my-3">
            <label for="reply" class="form-label">
              Your Reply
            </label>
            <input
              class="form-control"
              type="text"
              id="reply"
              placeholder="write your reply here..."
            />
          </div>
          <button className="btn btn-sm btn-outline-dark" type="submit">
            Add
          </button>
        </form>
      )}

      {isShowReplies && (
        <div className="container mt-2">
          {allReplys.map((reply) => (
            <div className="border rounded p-3 mb-3 shadow-sm bg-white" key={reply.$id}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-dark p-2">Posted by: {reply.userName}</span>
                </div>
                {((reply.userId == userData.$id) || isAuthor) && <button className="btn btn-sm btn-outline-danger" onClick={()=> deleteReply(reply.$id)}>
                  Delete
                </button>}
              </div>
              <p className="mt-2 mb-0 text-secondary">
                {reply.reply}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
