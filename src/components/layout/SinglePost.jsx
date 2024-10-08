/* eslint-disable react/prop-types */
import { PostHead } from "./PostHead";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
export const SinglePost = ({ post, comments }) => {
  return (
    <>
      <PostHead post={post} />
      <PostFooter post={post} comments={comments} />
      <PostBody post={post} />
    </>
  );
};
