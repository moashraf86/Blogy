import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../services/fetchComments";

export const useFetchComments = (post) => {
  return useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post),
  });
};
