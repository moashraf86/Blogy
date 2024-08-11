import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Edits an existing post in Firestore.
 * @param {Object} postData - Data for the post to be edited.
 * @param {string} postData.id - The ID of the post to be edited.
 * @param {string} postData.title - The updated title of the post.
 * @param {string} postData.content - The updated content of the post.
 * @param {string} postData.tag - The updated tag of the post.
 * @param {string} postData.image - The updated image URL of the post.
 */
export const editPost = async (postData) => {
  const { id, title, content, tag, image } = postData;

  // Reference to the post document.
  const postRef = doc(db, "posts", id);

  // Updated post data.
  const data = {
    title,
    content,
    tag,
    image: image || `https://picsum.photos/seed/${tag}/800/600`,
  };

  // Update the post document.
  await updateDoc(postRef, data);
};
