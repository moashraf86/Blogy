import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { fetchPosts } from "../services/fetchPosts";
import { db } from "../utils/firebase";

/**
 * Custom hook to fetch, filter, paginate, and delete posts.
 *
 * @param {string} postsQuery - Search query for fetching posts.
 * @param {number} postsPerPage - Number of posts per page for pagination.
 * @param {string} filterKey - Key for filtering posts.
 * @param {number} currentPage - Current page number for pagination.
 * @param {function} setTotalPosts - Function to set the total number of posts.
 * @param {Object} postToDelete - Post object to be deleted.
 * @returns {Object} postsQueryResult - Contains fetched posts and delete mutation.
 */
export const useFetchedPosts = (
  postsQuery,
  postsPerPage,
  filterKey,
  currentPage,
  setTotalPosts,
  postToDelete
) => {
  const queryClient = useQueryClient();

  // Query to fetch posts with pagination and filtering
  const postsQueryResult = useQuery({
    queryKey: ["posts", postsQuery, postsPerPage, filterKey, currentPage],
    queryFn: () =>
      fetchPosts(postsQuery, postsPerPage, filterKey, currentPage, setTotalPosts),
  });

  // Mutation for deleting a post
  const handleDeleteMutation = useMutation({
    mutationFn: async () => {
      const postRef = doc(db, "posts", postToDelete.id);
      await deleteDoc(postRef);
    },
    onSuccess: () => {
      // Invalidate and refetch posts data after successful deletion
      queryClient.invalidateQueries([
        "posts",
        postsQuery,
        postsPerPage,
        filterKey,
        currentPage,
      ]);
    },
  });

  return { ...postsQueryResult, handleDeleteMutation };
};
