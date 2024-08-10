// fetchComments.js
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";

export const fetchComments = async (post) => {
  const commentsQuery = query(
    collection(db, "posts", post.id, "comments"),
    orderBy("createdAt", "desc")
  );
  const commentsSnapshot = await getDocs(commentsQuery);
  const commentsList = commentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return commentsList;
};
