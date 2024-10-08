import { useParams } from "react-router-dom";
import { Comments } from "../components/layout/Comments";
import { SinglePost } from "../components/layout/SinglePost";
import { Alert, AlertDescription } from "../components/ui/alert";
import { RiErrorWarningLine } from "@remixicon/react";
import { useFetchPost } from "../hooks/useFetchPost";
import { useFetchComments } from "../hooks/useFetchComments";
import { PostSkeleton } from "../components/layout/PostSkeleton";

export const Post = () => {
  /**
   * Get the Post ID from the URL
   */
  const { id } = useParams();

  /**
   * Fetch Post by ID using the custom hook
   */
  const { data: post, isPending, isError, error } = useFetchPost(id);

  /**
   * Fetch Comments by Post ID
   */
  const { data: comments } = useFetchComments(id);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      {isPending && <PostSkeleton />}
      {post && (
        <div className={`flex w-full mb-6 sm:mb-4`}>
          <div className="relative flex flex-col border-zinc-800 w-full rounded-md">
            <SinglePost post={post} comments={comments} />
            <Comments post={post} />
          </div>
        </div>
      )}
      {isError && (
        <Alert variant="danger" className="flex items-center gap-3">
          <RiErrorWarningLine size={20} className="fill-danger" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
