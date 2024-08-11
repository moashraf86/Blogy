import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../services/fetchComments";

/**
 * Custom hook to fetch comments for a specific post.
 *
 * @param {Object} post - The post object containing the ID for fetching comments.
 * @returns {Object} - Result of the query, including comments data and query status.
 */
export const useFetchComments = (post) => {
  return useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post),
  });
};
