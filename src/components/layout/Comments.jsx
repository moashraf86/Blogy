/* eslint-disable react/prop-types */
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useQueryClient } from "@tanstack/react-query";

export const Comments = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  /**
   * Refetch the comments after adding/editing a new comment
   */
  const queryClient = useQueryClient();
  const refetchComments = () => {
    queryClient.invalidateQueries(["comments"]);
  };
  /**
   * Handle Change Comment
   */
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  /**
   * Handle Write Comment
   */
  const handleWriteComment = (e) => {
    e.preventDefault();
    // validate comment
    if (!comment) {
      setError("Comment is required");
      return;
    } else if (comment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    const writeComment = async () => {
      try {
        setError(null);
        const commentRef = doc(collection(db, "posts", post?.id, "comments"));
        const commentData = {
          id: commentRef.id,
          content: comment,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorImage:
            currentUser.photoURL ||
            "https://robohash.org/mail@ashallendesign.co.uk",
          postId: post?.id,
          createdAt: serverTimestamp(),
        };
        await setDoc(commentRef, commentData);
        // update posts comments count
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          commentsCount: post.commentsCount + 1,
        });
        // refetch the comments
        refetchComments();
        if (!commentData) throw new Error("Error writing comment");
      } catch (error) {
        setError(error.message);
      }
    };
    writeComment();
    setComment("");
  };

  /**
   * Handle Edit Comment
   */
  const handleEditComment = (e) => {
    e.preventDefault();
    // validate comment
    if (!comment) {
      setError("Comment is required");
      return;
    } else if (comment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }
    const editComment = async () => {
      try {
        setError(null);
        const commentRef = doc(
          db,
          "posts",
          post?.id,
          "comments",
          commentToEdit.id
        );
        const commentData = {
          id: commentRef.id,
          content: comment,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorImage: currentUser.photoURL,
          postId: post?.id,
          createdAt: serverTimestamp(),
        };
        await updateDoc(commentRef, commentData);
        // refetch the comments
        refetchComments();
        if (!commentData) throw new Error("Error writing comment");
      } catch (error) {
        setError(error.message);
      }
    };
    editComment();
    setComment("");
  };

  /**
   * Select Comment To Edit
   */
  const handleToEdit = (toEdit) => {
    setCommentToEdit(toEdit);
    setComment(toEdit.content);
    scrollToForm();
  };

  /**
   * Scroll to Form
   */
  const scrollToForm = () => {
    if (formRef.current) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = formRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.log("Form Ref is null");
    }
  };

  /**
   * Handle Submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentToEdit === null) {
      handleWriteComment(e);
    } else {
      handleEditComment(e);
      // clear comment to edit after editing
      setCommentToEdit(null);
    }
  };

  /**
   * Handle Delete Comment
   */
  const handleDeleteComment = (comment) => {
    const postRef = doc(db, "posts", post?.id);
    const commentRef = doc(db, "posts", post?.id, "comments", comment.id);
    const deleteComment = async () => {
      try {
        setError(null);
        await deleteDoc(commentRef);
        const postSnap = await getDoc(postRef);
        // update posts comments count
        await updateDoc(postRef, {
          commentsCount: postSnap.data().commentsCount - 1,
        });
        // refetch the comments
        refetchComments();
      } catch (error) {
        setError(error.message);
      }
    };
    deleteComment();
  };

  return (
    <>
      <CommentForm
        content={comment}
        post={post}
        handleSubmit={handleSubmit}
        handleChangeComment={handleChangeComment}
        currentUser={currentUser}
        error={error}
        formRef={formRef}
      />
      <CommentList
        post={post}
        commentToEdit={handleToEdit}
        handleDelete={handleDeleteComment}
      />
    </>
  );
};
