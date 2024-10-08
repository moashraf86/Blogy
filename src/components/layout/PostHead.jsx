/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export const PostHead = ({ post }) => {
  const { tag, id, title } = post;

  return (
    <div className="px-6 md:px-10 w-full max-w-4xl mx-auto">
      {/* Post Tag */}
      {tag && (
        <div className="flex justify-between items-center mb-3">
          <span className="bg-accent py-1 px-3 rounded-full text-muted-foreground text-xs font-medium uppercase tracking-widest">
            {tag}
          </span>
        </div>
      )}
      {/* Post Title */}
      <h3 className="text-2xl md:text-4xl text-primary font-bold capitalize mb-6">
        <Link to={`/post/${id}`}>{title}</Link>
      </h3>
      {/* Post Description */}
      {post.description && (
        <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
      )}
    </div>
  );
};
