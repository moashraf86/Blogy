/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getRelTime } from "../../utils/getRelTime";
import { RiMore2Fill } from "@remixicon/react";

export const Comment = ({ comment, commentToEdit, handleDelete }) => {
  const { authorName, authorImage, authorId, content, createdAt } = comment;
  const { currentUser } = useContext(AuthContext);
  const isCommentOwner = currentUser?.id === authorId;
  const userName = authorName;
  const date = new Date(createdAt.seconds * 1000);
  const timeAgo = getRelTime(date);
  const [firstName, lastName] = userName.split(" ") || "";
  return (
    <div
      key={comment.id}
      className="mb-4 p-4 bg-muted/30 border border-border rounded-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-2 rounded-full overflow-clip flex items-center justify-center text-sm border border-primary/20">
            <AvatarImage src={authorImage} alt="User avatar" />
            <AvatarFallback className="flex text-xs">
              {firstName[0]} {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <Link to={`/users/${authorId}`}>
              <p className="text-sm font-bold">{authorName}</p>
            </Link>
            <span className="text-xs text-gray-500">•</span>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        {/* Edit/Delete Dropdown */}
        {isCommentOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="text-primary cursor-pointer p-1"
              aria-label="Click to edit or delete comment"
            >
              <RiMore2Fill size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="font-medium"
                onSelect={() => commentToEdit(comment)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-medium text-red-500 focus:text-red-500"
                onSelect={() => handleDelete(comment)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p
        dir="auto"
        className="text-base text-primary/95 whitespace-pre-wrap leading-5"
      >
        {content}
      </p>
    </div>
  );
};
