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

export const Comment = ({
  comment,
  commentToEdit,
  handleEdit,
  handleDelete,
}) => {
  const { authorName, authorImage, authorId, content, createdAt } =
    comment || {};
  const { currentUser } = useContext(AuthContext);
  const isCommentOwner = currentUser?.id === authorId;
  const userName = authorName;
  const date = new Date(createdAt?.seconds * 1000) || {};
  const timeAgo = getRelTime(date);
  const [firstName, lastName] = userName.split(" ") || "";
  const isCommentEditing = commentToEdit?.id === comment.id;

  return (
    <div
      key={comment.id}
      className={`mb-4 p-4 bg-muted/30 border border-border rounded-lg ${
        isCommentEditing ? "border-1 border-warning/70" : ""
      }`}
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
            <span className="text-xs text-muted-foreground">•</span>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
            {comment.edited && !isCommentOwner ? (
              <span className="text-xs text-muted-foreground"> (Edited)</span>
            ) : null}
          </div>
        </div>
        {/* Edit/Delete Dropdown */}
        {isCommentOwner && !isCommentEditing ? (
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
                onSelect={() => handleEdit(comment)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-medium text-danger focus:text-danger"
                onSelect={() => handleDelete(comment)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        {/* Now Editing indicator */}
        {isCommentOwner && isCommentEditing ? (
          <span>
            <i className="text-xs text-warning">Editing</i>
          </span>
        ) : null}
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
