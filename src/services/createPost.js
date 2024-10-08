import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Creates a new post in Firestore.
 * @param {Object} postData - Data for the post.
 * @param {string} postData.title - The post title.
 * @param {string} postData.content - The post content.
 * @param {string} postData.tag - The post tag.
 * @param {string} [postData.image] - The post image URL.
 * @param {string} postData.authorId - The author's ID.
 * @param {string} postData.authorName - The author's name.
 * @param {string} postData.authorImage - The author's profile image URL.
 * @param {boolean} postData.isGuest - Indicates if the author is a guest.
 */
export const createPost = async (postData) => {
  const {
    title,
    description,
    content,
    tag,
    image,
    authorId,
    authorName,
    authorImage,
    isGuest,
  } = postData;

  // Reference to the new post document.
  const postsRef = doc(collection(db, "posts"));

  /**
   * Get random image from Unsplash API.
   * [1] generate random number between 0 and 1000
   * [2] use the random number as seed in the URL
   * [3] set the image URL as the default image if none is provided
   */
  const random = Math.floor(Math.random() * 1000);
  const defaultImage = {
    src: `https://picsum.photos/seed/${random}/1280/720`,
    alt: "Random image from picsum.photos",
    isInset: true,
  };

  // Post data to be stored.
  const data = {
    id: postsRef.id,
    title,
    description,
    content,
    tag,
    image: image.src ? image : defaultImage, // Default image if none is provided.
    bookmarksCount: 0,
    authorId,
    authorName,
    authorImage,
    published: !isGuest, // Only publish if not a guest.
    createdAt: serverTimestamp(),
  };

  // Add the post to Firestore.
  await setDoc(postsRef, data);
};
