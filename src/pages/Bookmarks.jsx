import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostsList } from "../components/layout/PostsList";
import { Alert, AlertDescription } from "../components/ui/alert";
import { RiInformationLine } from "@remixicon/react";
import { useFetchBookmarks } from "../hooks/useFetchBookmarks";

export const Bookmarks = () => {
  const { currentUser } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;

  const { data: posts } = useFetchBookmarks(currentUser, isGuest);

  if (!currentUser || isGuest) {
    return (
      <Alert variant="default" className="flex items-center gap-3">
        <RiInformationLine size={24} />
        <AlertDescription>Please login to see your bookmarks.</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <PostsList
        title="Bookmarks"
        postsQuery={posts}
        alertMsg="No Added Bookmarks"
      />
    </>
  );
};
