import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Fetches the bookmarks for the current user from Firestore.
 *
 * - Retrieves the list of bookmarked post IDs from the user's document.
 * - Fetches posts that match the bookmarked IDs.
 *
 * @param {Object} currentUser - The current user object containing user details.
 * @param {boolean} isGuest - Boolean indicating if the user is a guest.
 * @returns {Promise<Object[]>} - A query object for fetching the bookmarked posts.
 */
export const fetchBookmarks = async (userId, isGuest) => {
  // Return early if no user or if the user is a guest
  if (!userId || isGuest) return;

  // Reference to the user's document in Firestore
  const userRef = doc(db, "users", userId);

  // Get the user's document snapshot
  const userSnap = await getDoc(userRef);

  // Extract the list of bookmarked post IDs
  const userBookmarks = userSnap.data()?.bookmarks || [];

  // Create a query to fetch posts where the post userId is in the user's bookmarks
  const bookmarksQuery = {
    collection: query(
      collection(db, "posts"),
      where("id", "in", userBookmarks)
    ),
  };

  // Return the query object
  return bookmarksQuery;
};
