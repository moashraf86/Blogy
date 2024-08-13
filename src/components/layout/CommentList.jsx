/* eslint-disable react/prop-types */
import { Skeleton } from "../ui/skeleton";
import { Comment } from "./Comment";
import { Alert, AlertDescription } from "../ui/alert";
import { RiErrorWarningLine } from "@remixicon/react";
import { useFetchComments } from "../../hooks/useFetchComments";

export const CommentList = ({ post, commentToEdit, handleDelete }) => {
  // Get the post ID from the post object
  const { id: postId } = post || {};
  /**
   * Custom Hook to fetch comments
   */
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useFetchComments(postId);

  return (
    <div id="comments">
      <h3 className="text-primary font-bold text-xl mb-6">
        Comments ({comments?.length})
      </h3>
      {isLoading && (
        <div className="flex flex-col gap-4 rounded-lg bg-primary/10 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-3/4 h-3" />
          </div>
        </div>
      )}
      {isError && (
        <Alert variant="danger" className="flex items-center gap-3">
          <RiErrorWarningLine size={20} className="fill-danger" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!isLoading && !isError && comments?.length === 0 && (
        <p>No comments added yet</p>
      )}
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            commentToEdit={commentToEdit}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};
