import { useContext } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import { PostsList } from "../components/layout/PostsList";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { RiInformationLine } from "@remixicon/react";

export const MyPosts = () => {
  const { currentUser } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;
  /**
   * Query Variables
   */
  const postsQuery = {
    collection: query(
      collection(db, "posts"),
      where("authorId", "==", `${currentUser?.id}`)
    ),
  };

  // If user is not logged in, show a message to login
  if (!currentUser) {
    return (
      <div className="container pt-6 flex flex-col gap-4">
        <Alert variant="info" className="">
          <RiInformationLine />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>Please login to see your posts.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <PostsList
        title={isGuest ? "Drafts" : "My Posts"}
        postsQuery={postsQuery}
        alertMsg="No Posts Added yet."
      />
    </>
  );
};
