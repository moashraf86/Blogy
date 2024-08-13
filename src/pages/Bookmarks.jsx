import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostsList } from "../components/layout/PostsList";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { RiInformationLine } from "@remixicon/react";
import { useFetchBookmarks } from "../hooks/useFetchBookmarks";

export const Bookmarks = () => {
  const { currentUser } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;
  // Get Current user data from localStorage until it is fetched from the server
  const { id: userId } =
    JSON.parse(localStorage.getItem("currentUser")) || currentUser || {};

  const { data: posts } = useFetchBookmarks(userId, isGuest);

  if (!currentUser || isGuest) {
    return (
      <div className="container pt-6">
        <Alert variant="info">
          <RiInformationLine />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            Please login to see your bookmarks.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <PostsList
        title="Bookmarks"
        postsQuery={posts || []}
        alertMsg="No Bookmarks Found."
      />
    </>
  );
};
