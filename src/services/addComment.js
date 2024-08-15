import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Adds a comment to a post and updates the comment count.
 * @param {Object} commentData - Data for the comment.
 * @param {string} commentData.comment - The comment text.
 * @param {Object} commentData.post - The post object.
 * @param {Object} commentData.currentUser - The current user object.
 */
export const addComment = async (commentData) => {
  const { comment, post, currentUser } = commentData;

  // Reference to the new comment document.
  const commentRef = doc(collection(db, "posts", post?.id, "comments"));

  // Comment data to be stored.
  const data = {
    id: commentRef.id,
    content: comment,
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorImage: currentUser.photoURL || "",
    postId: post?.id,
    createdAt: serverTimestamp(),
  };

  // Add the comment to Firestore.
  await setDoc(commentRef, data);

  // Reference to the post document.
  const postRef = doc(db, "posts", post?.id);
  // get the post document snapshot.
  const postSnap = await getDoc(postRef);

  // Increment the post's comment count.
  await updateDoc(postRef, {
    commentsCount: postSnap.data.commentsCount + 1,
  });
};
