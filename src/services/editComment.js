import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Edits an existing comment in Firestore and refetches the comments.
 * @param {Object} commentData - Data for the comment and post.
 * @param {Object} commentData.comment - The new comment content.
 * @param {Object} commentData.post - The post containing the comment.
 * @param {Object} commentData.currentUser - The user editing the comment.
 * @param {Object} commentData.commentToEdit - The comment to be edited.
 * @param {Function} commentData.refetchComments - Function to refetch comments after editing.
 */
export const editComment = async (commentData) => {
  const { comment, post, currentUser, commentToEdit } = commentData;

  // Reference to the comment document.
  const commentRef = doc(db, "posts", post?.id, "comments", commentToEdit.id);

  // Updated comment data.
  const data = {
    id: commentRef.id,
    content: comment,
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorImage: currentUser.photoURL,
    postId: post?.id,
    edited: true,
    createdAt: serverTimestamp(),
  };

  // Update the comment
  await updateDoc(commentRef, data);
};
