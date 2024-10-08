/* eslint-disable react/prop-types */
import RichEditor from "./YooptaEditor";
import { useMemo } from "react";
import { createYooptaEditor } from "@yoopta/editor";

export const PostBody = ({ post }) => {
  // destructure post object to get image, title, and content
  const { image, content } = post;
  // convert content from string to normal object
  const contentParsed = JSON.parse(content);

  // create a ne editor
  const editor = useMemo(() => createYooptaEditor, []);

  return (
    <>
      {/* Post Image */}
      {image && (
        <div
          className={`w-full mx-auto mb-6 rounded-xl overflow-clip px-6 md:px-10 ${
            image.isInset ? "max-w-4xl" : "max-w-7xl lg:rounded-xl"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="relative w-full aspect-video object-cover rounded-xl"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x450";
              e.target.alt = "Image not found";
            }}
          />
        </div>
      )}

      {/* Post Content */}
      <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto px-6 md:px-10">
        <RichEditor editor={editor} defaultValue={contentParsed} readOnly />
      </div>
    </>
  );
};
