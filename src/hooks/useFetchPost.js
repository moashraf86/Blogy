import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../services/fetchPost";

/**
 * Custom hook to fetch a single post by its ID.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Object} - Result of the query, including the post data and query status.
 */
export const useFetchPost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });
};
