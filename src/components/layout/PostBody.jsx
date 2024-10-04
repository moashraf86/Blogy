/* eslint-disable react/prop-types */
import RichEditor from "./YooptaEditor";
import { useMemo } from "react";
import { createYooptaEditor } from "@yoopta/editor";

export const PostBody = ({ post }) => {
  // destructure post object to get image, title, and content
  const { image, title, content } = post;
  // convert content from string to normal object
  const contentParsed = JSON.parse(content);

  // create a ne editor
  const editor = useMemo(() => createYooptaEditor, []);

  return (
    <>
      {/* Post Image */}
      <div className="aspect-video bg-gradient-to-r from-zinc-400 to-zinc-800 rounded-lg overflow-clip mb-6">
        {image && (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        )}
      </div>
      {/* Post Content */}
      <div className="flex flex-col gap-2">
        <RichEditor editor={editor} defaultValue={contentParsed} readOnly />
      </div>
    </>
  );
};
