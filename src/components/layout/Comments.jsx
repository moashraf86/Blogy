/* eslint-disable react/prop-types */
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/addComment";
import { validateComment } from "../../utils/validateForm";
import { editComment } from "../../services/editComment";
import { deleteComment } from "../../services/deleteComment";
import { scrollToForm } from "../../utils/scrollToForm";

export const Comments = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const { id: postId } = post || {};
  const commentHasChanged = commentToEdit?.content !== comment;
  const [isSubmitted, setIsSubmitted] = useState(false);
  /**
   * Refetch the comments after Adding, Editing or Deleting a new comment
   */
  const queryClient = useQueryClient();
  const refetchComments = () => {
    queryClient.invalidateQueries(["comments", postId]);
  };
  /**
   * Handle Change Comment
   */
  const handleChangeComment = (e) => {
    setComment(e.target.value);
    // validate comment field
    if (isSubmitted) {
      validateComment(e.target.value, setError);
    }
  };

  /**
   * Handle Write Comment
   */
  const handleWriteComment = (e) => {
    e.preventDefault(); // prevent default form submission

    setIsSubmitted(true);
    // validate comment field
    if (!validateComment(comment, setError)) {
      return;
    }

    addComment({ comment, post, currentUser, setError }); // add comment to the post

    refetchComments(); // refetch the comments

    setComment(""); // clear the comment field
  };

  /**
   * Handle Edit Comment
   */
  const handleEditComment = (e) => {
    e.preventDefault(); // prevent default form submission
    setIsSubmitted(true);
    // validate comment field
    if (!validateComment(comment, setError)) {
      return;
    }

    editComment({ comment, post, currentUser, commentToEdit }); // edit the comment

    refetchComments(); // refetch the comments

    setComment(""); // clear the comment field
  };

  /**
   * Select Comment To Edit
   */
  const handleToEdit = (toEdit) => {
    setCommentToEdit(toEdit);
    setComment(toEdit.content);
    scrollToForm(formRef); // scroll to the form
  };

  /**
   * Handle Submit
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission

    /**
     * If commentToEdit is null, then write a new comment
     * Otherwise, edit the selected comment
     **/

    if (commentToEdit === null) {
      handleWriteComment(e);
    } else {
      //check if the user changes the comment content or not
      if (commentToEdit.content === comment) {
        return;
      }
      handleEditComment(e);
      setCommentToEdit(null);
    }
  };

  /**
   * Handle Cancel Edit
   */
  const handleCancelEdit = () => {
    setCommentToEdit(null);
    setComment("");
  };
  /**
   * Handle Delete Comment
   */
  const handleDeleteComment = (comment) => {
    deleteComment({ comment, post }); // delete the comment
    refetchComments(); // refetch the comments
  };

  return (
    <>
      <CommentForm
        content={comment}
        post={post}
        handleSubmit={handleSubmit}
        handleChangeComment={handleChangeComment}
        handleCancelEdit={handleCancelEdit}
        currentUser={currentUser}
        error={error}
        formRef={formRef}
        buttonLabel={commentToEdit ? "Edit" : "Write"}
        commentToEdit={commentToEdit}
        commentHasChanged={commentHasChanged}
      />
      <CommentList
        post={post}
        commentToEdit={commentToEdit}
        handleEdit={handleToEdit}
        handleDelete={handleDeleteComment}
      />
    </>
  );
};
