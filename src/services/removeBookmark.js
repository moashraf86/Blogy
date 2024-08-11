import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Removes a post from the user's bookmarks and updates the bookmark count on the post.
 * @param {Object} post - The post object to be removed from bookmarks.
 * @param {Object} currentUser - The current user object.
 * @param {Function} updateUser - Function to update the current user's state.
 * @param {Function} setBookmarking - Function to set the bookmarking state.
 * @param {Function} refreshCache - Function to refresh the cache after updating.
 */
export const removeBookmark = async (
  post,
  currentUser,
  updateUser,
  setBookmarking,
  refreshCache
) => {
  setBookmarking(true); // Set bookmarking state to true to indicate loading.

  const postRef = doc(db, "posts", post?.id); // Reference to the post's document in Firestore.
  const userRef = doc(db, "users", currentUser?.id); // Reference to the user's document in Firestore.

  // Fetch the current user's document snapshot.
  const userSnap = await getDoc(userRef);
  // Fetch the post's document snapshot.
  const postSnap = await getDoc(postRef);

  // Update the post's bookmark count by decrementing it by 1, ensuring it doesn't go below 0.
  await updateDoc(postRef, {
    ...post,
    bookmarksCount: Math.max(postSnap.data().bookmarksCount - 1, 0),
  });

  // Update the user's bookmarks array in Firestore by removing the post ID.
  const updatedBookmarks = userSnap
    .data()
    .bookmarks.filter((id) => id !== post.id);
  await updateDoc(userRef, { bookmarks: updatedBookmarks });

  // Update the current user's state in the application.
  updateUser({ bookmarks: updatedBookmarks });

  refreshCache(); // Refresh the cache to reflect the updates.
  setBookmarking(false); // Set bookmarking state to false to indicate completion.
};
