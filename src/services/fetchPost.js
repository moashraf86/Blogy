import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Fetches a single post from the Firebase Firestore by its ID.
 *
 * - Retrieves the post document from the "posts" collection.
 * - Returns the post data if it exists, otherwise returns `undefined`.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Object|undefined} The post data, or `undefined` if the post does not exist.
 */

export const fetchPost = async (id) => {
  const postCollection = collection(db, "posts");
  const postDoc = doc(postCollection, id);
  const postSnap = await getDoc(postDoc);
  const postData = postSnap.data();
  return postData;
};
