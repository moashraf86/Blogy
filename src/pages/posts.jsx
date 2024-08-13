import { collection, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { PostsList } from "../components/layout/PostsList";
import { useTheme } from "../context/ThemeProviderContext";

export const Posts = () => {
  const { theme } = useTheme();

  /**
   * Query Variables
   */
  const posts = {
    collection: query(collection(db, "posts"), where("published", "==", true)),
  };

  console.log(theme);

  return (
    <>
      <PostsList
        title="All posts"
        postsQuery={posts}
        alertMsg="No Posts Added yet."
      />
    </>
  );
};
