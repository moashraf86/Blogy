import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Adds a post to the user's bookmarks and updates the bookmark count on the post.
 * @param {Object} post - The post object to be bookmarked.
 * @param {Object} currentUser - The current user object.
 * @param {Function} updateUser - Function to update the current user's state.
 * @param {Function} setBookmarking - Function to set the bookmarking state.
 * @param {Function} refreshCache - Function to refresh the cache after updating.
 */
export const addBookmark = async (
  post,
  currentUser,
  updateUser,
  setBookmarking,
  refreshCache
) => {
  setBookmarking(true); // Set bookmarking state to true to indicate loading.

  const userRef = doc(db, "users", currentUser?.id); // Reference to the user's document in Firestore.
  const postRef = doc(db, "posts", post?.id); // Reference to the post's document in Firestore.

  // Fetch the current user's document snapshot.
  const userSnap = await getDoc(userRef);
  // Fetch the post's document snapshot.
  const postSnap = await getDoc(postRef);

  // Update the post's bookmark count by incrementing it by 1.
  await updateDoc(postRef, {
    ...post,
    bookmarksCount: postSnap.data().bookmarksCount + 1,
  });

  // Update the user's bookmarks array in Firestore.
  await updateDoc(userRef, {
    bookmarks: userSnap.data().bookmarks.includes(post.id)
      ? userSnap.data().bookmarks // If already bookmarked, keep the bookmarks array unchanged.
      : [...userSnap.data().bookmarks, post.id], // Otherwise, add the post ID to the bookmarks array.
  });

  // Update the current user's state in the application.
  updateUser({
    bookmarks: userSnap.data().bookmarks.includes(post.id)
      ? userSnap.data().bookmarks // If already bookmarked, keep the bookmarks array unchanged.
      : [...userSnap.data().bookmarks, post.id], // Otherwise, add the post ID to the bookmarks array.
  });

  refreshCache(); // Refresh the cache to reflect the updates.
  setBookmarking(false); // Set bookmarking state to false to indicate completion.
};
