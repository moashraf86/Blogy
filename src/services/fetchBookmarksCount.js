import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Fetches the bookmark count for a specific post from Firestore.
 *
 * - Retrieves the document for the given post ID.
 * - Extracts the `bookmarksCount` field from the post document.
 *
 * @param {Object} post - The post object containing the post ID.
 * @returns {Promise<number>} - The count of bookmarks for the specified post.
 */

export const fetchBookmarksCount = async (post) => {
  // Reference to the post document in Firestore
  const postRef = doc(db, "posts", post.id);

  // Get the post document snapshot
  const postSnap = await getDoc(postRef);

  // Return the bookmarks count from the post document
  return postSnap.data().bookmarksCount;
};
