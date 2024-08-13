import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Fetches comments for a specific post from Firebase Firestore.
 *
 * - Retrieves comments from the "comments" subcollection of the given post, ordered by creation date.
 * - Returns a list of comments sorted in descending order by `createdAt`.
 *
 * @param {Object} post - The post object containing the post ID.
 * @returns {Array<Object>} The list of fetched comments with their IDs.
 */

export const fetchComments = async (postId) => {
  const commentsQuery = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "desc")
  );
  const commentsSnapshot = await getDocs(commentsQuery);
  const commentsList = commentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return commentsList;
};
