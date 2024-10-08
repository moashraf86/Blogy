import { useParams } from "react-router-dom";
import { Comments } from "../components/layout/Comments";
import { SinglePost } from "../components/layout/SinglePost";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
import { RiErrorWarningLine } from "@remixicon/react";
import { useFetchPost } from "../hooks/useFetchPost";
import { useFetchComments } from "../hooks/useFetchComments";

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
      {isPending && (
        <div className="flex flex-col gap-4 rounded-md p-4">
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-full h-8" />
          <div className="w-full flex items-center gap-2 mb-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-32 h-3" />
          </div>
          <Skeleton className="w-full h-96 mb-4" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-3/4 h-3" />
            <Skeleton className="w-1/2 h-3" />
          </div>
          <div className="flex items-center gap-3 border-t border-b py-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-3" />
              <Skeleton className="w-32 h-2" />
            </div>
          </div>
        </div>
      )}
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
