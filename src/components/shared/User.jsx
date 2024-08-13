import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useHref } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiFileListFill,
  RiFileListLine,
  RiHome5Fill,
  RiHome5Line,
  RiLogoutBoxLine,
  RiUserFill,
  RiUserLine,
} from "@remixicon/react";

export const User = () => {
  const { currentUser, signOut } = useContext(AuthContext);
  const { isGuest } = currentUser || false;
  const { photoURL: userImg } = currentUser || "";
  const { name: userName } = currentUser || "Anonymous";
  const currentPage = useHref().split("/")[1];
  /**
   * Get the first char of the user name and the first char after the space
   */
  const [firstName, lastName] = userName.split(" ") || "";

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent cursor-pointer overflow-clip "
          >
            {!isGuest ? (
              <Avatar className="flex w-full h-full items-center justify-center">
                <AvatarImage src={userImg} alt="User avatar" />
                <AvatarFallback>
                  {firstName[0]} {lastName[0]}
                </AvatarFallback>
              </Avatar>
            ) : (
              <RiUserLine size={24} className="text-muted-foreground" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[12rem] md:min-w-[14rem]"
        >
          <DropdownMenuLabel className="text-base font-bold">
            {userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator aria-label="separator line" />
          <DropdownMenuItem
            asChild
            className={`flex gap-2 items-center ${
              currentPage === "" && "bg-accent"
            }`}
          >
            <Link to="/" aria-label="Home page">
              {currentPage === "" ? (
                <RiHome5Fill size={18} />
              ) : (
                <RiHome5Line size={18} />
              )}
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={`flex gap-2 items-center ${
              currentPage === "users" && "bg-accent"
            }`}
          >
            <Link to={`/users/${currentUser.id}`} aria-label="Profile page">
              {currentPage === "users" ? (
                <RiUserFill size={18} />
              ) : (
                <RiUserLine size={18} />
              )}
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {!isGuest ? (
            <DropdownMenuItem
              asChild
              className={`flex gap-2 items-center ${
                currentPage === "my-posts" && "bg-accent"
              }`}
            >
              <Link to="/my-posts" aria-label="my posts page">
                {currentPage === "my-posts" ? (
                  <RiFileListFill size={18} />
                ) : (
                  <RiFileListLine size={18} />
                )}
                <span>My Posts</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              asChild
              className={`flex gap-2 items-center ${
                currentPage === "drafts" && "bg-accent"
              }`}
            >
              <Link to="/drafts" aria-label="Drafts page">
                {currentPage === "drafts" ? (
                  <RiBookmarkFill size={18} />
                ) : (
                  <RiBookmarkLine size={18} />
                )}
                <span>Drafts</span>
              </Link>
            </DropdownMenuItem>
          )}
          {!isGuest && (
            <DropdownMenuItem
              asChild
              className={`flex gap-2 items-center ${
                currentPage === "bookmarks" && "bg-accent"
              }`}
            >
              <Link to="/bookmarks" aria-label="Bookmarks page">
                {currentPage === "bookmarks" ? (
                  <RiBookmarkFill size={18} />
                ) : (
                  <RiBookmarkLine size={18} />
                )}
                <span>Bookmarks</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator aria-label="separator line" />
          <DropdownMenuItem
            className="flex items-center gap-2 text-danger focus:text-danger mb-0"
            onSelect={signOut}
            aria-label="Sign out Button"
          >
            <RiLogoutBoxLine size={18} className="fill-danger" />
            <span className="font-semibold">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
