import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Deletes a comment from Firestore and updates the comments count on the post.
 * @param {Object} commentData - Data for the comment and post.
 * @param {Object} commentData.comment - The comment to delete.
 * @param {Object} commentData.post - The post containing the comment.
 */
export const deleteComment = async (commentData) => {
  const { comment, post } = commentData;

  // References to the comment and post documents.
  const commentRef = doc(db, "posts", post?.id, "comments", comment.id);
  const postRef = doc(db, "posts", post?.id);

  // Delete the comment.
  await deleteDoc(commentRef);

  // Retrieve the post and update the comments count.
  const postSnap = await getDoc(postRef);
  await updateDoc(postRef, {
    commentsCount: postSnap.data().commentsCount - 1,
  });
};
