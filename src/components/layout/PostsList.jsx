/* eslint-disable react/prop-types */
import { useState, lazy, Suspense } from "react";
import { PostItem } from "./PostItem";
import { Pagination } from "../shared/Pagination";
import { Filter } from "../shared/Filter";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { RiErrorWarningLine, RiInformationLine } from "@remixicon/react";
import { useFetchedPosts } from "../../hooks/useFetchPosts";

/**
 * Lazy load ConfirmDeleteModal
 */
const ConfirmDeleteModal = lazy(() =>
  import("../shared/ConfirmDeleteModal").then((module) => ({
    default: module.ConfirmDeleteModal,
  }))
);

export const PostsList = ({ title, postsQuery, alertMsg }) => {
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterKey, setFilterKey] = useState("all");
  const postsPerPage = 3;

  /**
   * Destructuring the posts, isLoading, isError and error from the custom hook
   */
  const {
    data: posts,
    isLoading,
    isError,
    error,
    handleDeleteMutation,
  } = useFetchedPosts(
    postsQuery,
    postsPerPage,
    filterKey,
    currentPage,
    setTotalPosts,
    postToDelete
  );

  /**
   * Filter posts based on category
   */
  const handleFilter = (key) => {
    setFilterKey(key);
    setCurrentPage(1);
    // setTotalPosts(data.totalPosts);
  };

  /**
   * Handle Show Modal
   */
  const handleShowModal = (post) => {
    setShowModal(true);
    setPostToDelete(post);
  };

  /**
   * Handle Delete Post
   */
  const handleDeletePost = () => {
    handleDeleteMutation.mutate();
    setShowModal(false);
  };

  /**
   * Handle Current Page
   */
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
  };

  return (
    <div className="flex flex-col gap-8 mt-6">
      <div className="container px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
          <Filter handleFilter={handleFilter} />
        </div>
      </div>
      <div className="container px-5 flex justify-start flex-wrap">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 sm:px-3 w-full sm:w-1/2 xl:w-1/4 "
            >
              <div className="bg-muted/30 border border-border rounded-md mb-6">
                <Skeleton className="w-full aspect-video rounded-br-none rounded-bl-none" />
                <div className="flex flex-col gap-3 p-4">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-full h-6 mb-2" />
                  <Skeleton className="w-full h-3" />
                  <Skeleton className="w-3/4 h-3" />
                  <Skeleton className="w-1/2 h-3" />
                  <Skeleton className="w-32 h-4 mt-3" />
                </div>
              </div>
            </div>
          ))}
        {posts &&
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              handleShowModal={() => handleShowModal(post)}
              fetchPosts={posts}
            />
          ))}
        {!isLoading && !isError && !posts.length && (
          <Alert variant="info" className="flex items-center gap-3">
            <span>
              <RiInformationLine />
            </span>
            <AlertDescription>{alertMsg}</AlertDescription>
          </Alert>
        )}
        {isError && (
          <Alert variant="danger">
            <RiErrorWarningLine />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <Pagination
        totalPosts={totalPosts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        handleCurrentPage={handleCurrentPage}
      />
      {/* Confirm Delete Dialog */}
      <Suspense>
        <ConfirmDeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleDeletePost={handleDeletePost}
        />
      </Suspense>
    </div>
  );
};
