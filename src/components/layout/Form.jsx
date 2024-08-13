/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Switch } from "../ui/switch";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiEditBoxLine,
  RiImageFill,
  RiInformationLine,
} from "@remixicon/react";
import { Editor } from "./Editor";
import { ComboboxDemo } from "../ui/combo-box";
import { tags } from "../../utils/tags";
import { Button } from "../ui/button";
export const Form = ({
  title,
  content,
  image,
  tag,
  onsubmit,
  onSelect,
  handleImageChange,
  handleRemoveImage,
  handleChange,
  handleSelectRandomImage,
  isImageRequired,
  errors,
  redirectTime,
}) => {
  const { currentUser } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;

  /**
   * Hide the alert message
   */
  const hideAlert = (e) => {
    e.target.closest(".container").style.display = "none";
  };
  // destructuring the errors object
  const {
    title: titleError,
    content: contentError,
    tag: tagError,
    image: imageError,
  } = errors;
  return (
    <>
      {/* If user is a guest, show a message to log in with Google to publish posts */}
      {isGuest ? (
        <div className="container pt-6 px-5 sm:px-8 relative">
          <Alert variant="info">
            <RiInformationLine />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              Login with Google to publish your posts.
            </AlertDescription>
            <button className="absolute top-3 right-3" onClick={hideAlert}>
              <RiCloseLine />
            </button>
          </Alert>
        </div>
      ) : null}
      {currentUser ? (
        <div className="flex justify-center items-center max-w-4xl mx-auto">
          <div className="flex flex-col w-full bg-background rounded-md p-6 gap-4 mt-6">
            <form
              onSubmit={onsubmit}
              className="flex flex-col gap-4 items-start"
            >
              <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3">
                <div className="flex flex-col gap-1">
                  <ComboboxDemo
                    onSelect={onSelect}
                    tags={tags}
                    selectedValue={tag}
                    error={tagError.hasError}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2 flex-wrap">
                    {!image && isImageRequired && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className={`cursor-pointer gap-1 ${
                          imageError.hasError
                            ? "border-danger text-danger hover:text-danger hover:bg-danger/10"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="image"
                          tabIndex="0"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              document.getElementById("image").click();
                            }
                          }}
                        >
                          <RiImageFill
                            size={16}
                            className={`opacity-70 shrink-0${
                              imageError.hasError
                                ? "fill-danger"
                                : "fill-muted-foreground"
                            }`}
                          />
                          Add Cover
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                          />
                        </label>
                      </Button>
                    )}
                    {!image && isImageRequired && (
                      <p className="text-sm uppercase text-center text-zinc-400">
                        or
                      </p>
                    )}
                    {/* Select Random image */}
                    {!image && (
                      <div className="flex gap-2 items-center ">
                        <Switch
                          aria-label="Select random image instead"
                          id="switch"
                          onCheckedChange={handleSelectRandomImage}
                        />
                        <label
                          htmlFor="switch"
                          className={`text-sm cursor-pointer ${
                            isImageRequired && "text-muted-foreground"
                          }`}
                        >
                          Random image
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Post Title */}
              <div className="flex flex-col gap-1 self-stretch">
                <input
                  name="title"
                  id="title"
                  className={`w-full p-2 text-primary bg-transparent rounded-md text-2xl md:text-4xl  md:leading-[1.5] font-bold focus-visible:outline-none ${
                    !titleError.hasError && "border-input"
                  } ${titleError.hasError && "border-danger"}`}
                  value={title}
                  type="text"
                  placeholder="Add title"
                  onChange={(e) => handleChange(e)}
                />
                {titleError.hasError && (
                  <p className="text-sm text-danger">{titleError.message}</p>
                )}
              </div>
              {/* Display the image */}
              {image && (
                <div className="relative rounded-md overflow-clip self-stretch">
                  <div className="group absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center gap-4 hover:bg-zinc-800/60">
                    <label
                      tabIndex="0"
                      htmlFor="image"
                      className="hidden group-hover:flex w-12 h-12 cursor-pointer items-center justify-center focus:outline-none focus:ring-2 focus:ring-zinc-50 rounded-md"
                      title="Edit image"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("image").click();
                        }
                      }}
                    >
                      <RiEditBoxLine size={30} className="fill-white" />
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                    <button
                      onClick={handleRemoveImage}
                      className="hidden group-hover:inline w-12 h-12 focus:outline-none focus:ring-2 focus:ring-zinc-50 rounded-md"
                      title="Delete Image"
                    >
                      <RiDeleteBinLine size={30} className="fill-white" />
                    </button>
                  </div>
                  <img
                    className="w-full aspect-video object-cover"
                    src={image}
                    alt=""
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 self-stretch">
                <Editor
                  name="title"
                  value={content}
                  onChange={(e) => {
                    handleChange({ target: { name: "content", value: e } });
                  }}
                />
                {contentError.hasError && (
                  <p className="text-sm text-danger">{contentError.message}</p>
                )}
              </div>
              <Button type="submit" className="self-end mt-3" size="lg">
                {isGuest ? "Save to Drafts" : "Publish"}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container pt-6">
          <Alert variant="info">
            <RiInformationLine />
            <AlertTitle>Log in to write a post</AlertTitle>
            <AlertDescription>
              You will be redirected to the home page in <b>{redirectTime}</b>{" "}
              seconds.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};
