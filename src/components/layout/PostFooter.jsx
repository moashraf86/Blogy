/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiChat3Line,
  RiLoader4Line,
  RiShareForwardLine,
} from "@remixicon/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { GoogleIcon } from "../shared/GoogleIcon";
import { useQueryClient } from "@tanstack/react-query";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { addBookmark } from "../../services/addBookmark";
import { removeBookmark } from "../../services/removeBookmark";
import { useFetchBookmarksCount } from "../../hooks/useFetchBookmarksCount";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

export const PostFooter = ({ post, comments }) => {
  const { currentUser, updateUser, signIn } = useContext(AuthContext);
  const { id: userId } = currentUser || {};
  const isBookmarked = currentUser?.bookmarks?.includes(post.id);
  const {
    authorImage,
    authorName,
    authorId,
    createdAt,
    id: postId,
  } = post || {};
  const { isGuest } = currentUser || {};
  const [bookmarkAlert, setBookmarkAlert] = useState(false);
  const [Bookmarking, setBookmarking] = useState(false);
  const [firstName, lastName] = authorName.split(" ") || "";

  /**
   *  Get Date from the createdAt timestamp
   */
  const date = formatTimestamp(createdAt);

  /**
   * Refresh the query cache
   */
  const queryClient = useQueryClient(); // Correctly use the hook
  const refreshCache = () => {
    queryClient.invalidateQueries(["bookmarksCount", postId]);
    queryClient.invalidateQueries(["bookmarks", userId]);
  };

  // destructure the data from the custom hook
  const { data: bookmarksCountData, isLoading } =
    useFetchBookmarksCount(postId);

  /**
   * Handle Add Bookmark
   */
  const handleAddBookmark = (post) => {
    // if the user is not signed in, return
    if (!currentUser || isGuest) {
      setBookmarkAlert(true);
      return;
    }
    // check if the user is offline
    if (!navigator.onLine) {
      alert("You are offline. Please check your internet connection.");
      return;
    }

    addBookmark(post, currentUser, updateUser, setBookmarking, refreshCache); // Add Bookmark
  };

  /**
   * Handle Remove Bookmark
   */
  const handleRemoveBookmark = (post) => {
    // if the user is not signed in, return
    if (!currentUser || isGuest) {
      setBookmarkAlert(true);
      return;
    }
    // check if the user is offline
    if (!navigator.onLine) {
      alert("You are offline. Please check your internet connection.");
      return;
    }

    removeBookmark(post, currentUser, updateUser, setBookmarking, refreshCache); // Remove Bookmark
  };

  /**
   * Handle Sign In With Google
   */
  const handleGoogleSignIn = () => {
    signIn();
    setBookmarkAlert(false);
  };

  return (
    <div className="flex justify-between items-center py-3 my-4 border-t border-b border-border">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="overflow-clip">
          <Avatar className="flex w-full h-full items-center justify-center">
            <AvatarImage src={authorImage} alt={authorName} />
            <AvatarFallback>
              {authorName === "Anonymous"
                ? "A"
                : `${firstName[0]} ${lastName[0]}`}
            </AvatarFallback>
          </Avatar>
        </Button>
        <div className="flex flex-col ">
          <p className="text-primary font-semibold ml-2">
            <Link to={`/users/${authorId}`}>{authorName}</Link>
          </p>
          <p className="text-muted-foreground text-sm ml-2">
            Published At: {date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Bookmarks */}
        {isLoading ? (
          <RiLoader4Line size={18} className="fill-primary" />
        ) : (
          <div className="flex items-center gap-1">
            {isBookmarked ? (
              <button
                className="cursor-pointer text-primary p-1"
                onClick={() => handleRemoveBookmark(post)}
                aria-label="Remove Bookmark"
              >
                {Bookmarking ? (
                  <RiLoader4Line
                    size={18}
                    className="animate-spin duration-600 fill-primary"
                  />
                ) : (
                  <RiBookmarkFill size={18} className="fill-primary" />
                )}
              </button>
            ) : (
              <button
                className="cursor-pointer text-primary p-1"
                onClick={() => handleAddBookmark(post)}
                aria-label="Add Bookmark"
              >
                {Bookmarking ? (
                  <RiLoader4Line
                    size={18}
                    className="animate-spin duration-600 fill-primary"
                  />
                ) : (
                  <RiBookmarkLine size={18} className="fill-primary" />
                )}
              </button>
            )}
            <p className="text-primary">
              {bookmarksCountData > 0 && bookmarksCountData}
            </p>
          </div>
        )}
        {/* comments */}
        <div className="flex items-center gap-1">
          <RiChat3Line size={18} className="fill-primary" />
          {comments?.length > 0 && (
            <p className="text-lg">{comments?.length}</p>
          )}
        </div>
        {/* Share */}
        <button
          className="cursor-pointer text-primary"
          aria-label="Share this post"
          onClick={() =>
            navigator.share({ title: post.title, url: window.location.href })
          }
        >
          <RiShareForwardLine size={18} className="fill-primary" />
        </button>
      </div>
      {/* Sign In to Bookmark alert */}
      <AlertDialog open={bookmarkAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Want to bookmark this post?</AlertDialogTitle>
            <AlertDialogDescription>
              Sign in with Google to save it to your account and access it
              anytime!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBookmarkAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="md:text-base flex gap-[10px]"
              onClick={() => handleGoogleSignIn()}
            >
              <GoogleIcon />
              Sign in with Google
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
