/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Switch } from "../ui/switch";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiEditBoxLine,
  RiFullscreenExitLine,
  RiFullscreenLine,
  RiImageFill,
  RiInformationLine,
} from "@remixicon/react";
import { ComboboxDemo } from "../ui/combo-box";
import { tags } from "../../utils/tags";
import { Button } from "../ui/button";
import { SignInModal } from "../shared/SignInModal";
import YooptaTextEditor from "./YooptaEditor";
import { CharCountDisplay } from "../shared/CharCountDisplay";
export const Form = ({
  title,
  description,
  content,
  image,
  tag,
  onsubmit,
  onSelect,
  handleImageChange,
  handleRemoveImage,
  handleToggleImageMode,
  handleChange,
  handleSelectRandomImage,
  isImageRequired,
  errors,
  redirectTime,
}) => {
  const { currentUser } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;
  const [showModal, setShowModal] = useState(false);
  const [charsCount, setCharsCount] = useState(0);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  /**
   * Hide the alert message
   */
  const hideAlert = (e) => {
    e.target.closest(".container").style.display = "none";
  };
  // destructuring the errors object
  const {
    title: titleError,
    description: descriptionError,
    content: contentError,
    tag: tagError,
    image: imageError,
  } = errors;

  /**
   * Check if the form is ready to be submitted
   */
  const hasEmptyFields = !title || !description || !content || !tag;
  const hasErrors =
    titleError.hasError ||
    descriptionError.hasError ||
    contentError.hasError ||
    tagError.hasError ||
    imageError.hasError;
  const isImageMissing = isImageRequired && !image.src;

  const notReadyForSubmit = hasEmptyFields || hasErrors || isImageMissing;

  /**
   * Auto resize the textarea
   */

  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  /**
   * Set the character count
   * @param {string} value - counted characters comes from calcContentChars function
   * @returns {void}
   * sets the character count state to the length of the content
   */
  const handleCharCount = (value) => {
    setCharsCount(value);
  };

  /**
   * Fire autoResize function when the component mounts
   */
  useEffect(() => {
    autoResize(titleRef);
    autoResize(descriptionRef);
  }, [title, description]);
  return (
    <>
      {/* If user is a guest, show a message to log in with Google to publish posts */}
      {isGuest ? (
        <div className="container pt-6 px-6 max-w-4xl">
          <Alert
            variant="info"
            className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center p-4 sm:py-6 sm:px-8 group"
          >
            <div className="flex gap-3">
              <RiInformationLine className="text-lg min-w-6" />
              <div className="flex flex-col">
                <AlertTitle>Action Required</AlertTitle>
                <AlertDescription>
                  Log in with Google to publish your posts.
                </AlertDescription>
              </div>
            </div>
            <Button size="lg" onClick={() => setShowModal(true)}>
              Sign In
            </Button>
            <button
              className="absolute top-3 right-3 hidden group-hover:inline"
              onClick={hideAlert}
            >
              <RiCloseLine />
            </button>
          </Alert>
        </div>
      ) : null}
      {currentUser ? (
        <div className="flex justify-center items-center max-w-4xl mx-auto">
          <div className="flex flex-col w-full bg-background rounded-md py-6 gap-4 mt-6">
            <form
              onSubmit={onsubmit}
              className="flex flex-col gap-4 items-start"
            >
              <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 w-full px-6 md:px-16">
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
                    {!image.src && isImageRequired && (
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
                    {!image.src && isImageRequired && (
                      <p className="text-sm uppercase text-center text-zinc-400">
                        or
                      </p>
                    )}
                    {/* Select Random image */}
                    {!image.src && (
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
                {/* Publish Button */}
                <div className="fixed bottom-0 left-0 right-0 bg-background z-20 py-3 px-6 border-t border-border shadow-sm flex flex-1 justify-end md:static md:p-0 md:border-none md:shadow-none md:bg-none">
                  <Button
                    size="lg"
                    type="submit"
                    className="disabled:opacity-20"
                    disabled={notReadyForSubmit}
                  >
                    {isGuest ? "Save to Drafts" : "Publish"}
                  </Button>
                </div>
              </div>
              {/* Post Title */}
              <div className="flex flex-col gap-1 self-stretch px-6 md:px-16">
                <textarea
                  ref={titleRef}
                  name="title"
                  id="title"
                  className="w-full p-2 text-primary bg-transparent rounded-md text-2xl md:text-4xl font-bold focus-visible:outline-none resize-none overflow-hidden"
                  value={title}
                  type="text"
                  rows={1}
                  placeholder="Title"
                  onInput={() => autoResize(titleRef)}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "title", value: e.target.value },
                    })
                  }
                ></textarea>
                {titleError.hasError && (
                  <p className="text-sm text-danger">{titleError.message}</p>
                )}
              </div>
              {/* Post Description */}
              <div className="flex flex-col gap-1 self-stretch px-6 md:px-16">
                <textarea
                  ref={descriptionRef}
                  name="description"
                  id="description"
                  autoComplete="off"
                  className="w-full p-2 text-primary bg-transparent rounded-md text-lg md:text-xl  md:leading-[1.5] focus-visible:outline-none resize-none overflow-hidden"
                  value={description}
                  type="text"
                  rows={1}
                  placeholder="Description"
                  onInput={() => autoResize(descriptionRef)}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "description", value: e.target.value },
                    })
                  }
                ></textarea>
                {descriptionError.hasError && (
                  <p className="text-sm text-danger">
                    {descriptionError.message}
                  </p>
                )}
              </div>
              {/* Display the image */}
              {image.src && (
                <div
                  className={`relative overflow-clip self-stretch ${
                    image.isInset ? "px-6 md:px-16" : "px-6 lg:px-0"
                  }`}
                >
                  <div className="relative after:absolute after:content-[''] after:inset-0 after:bg-black/50 after:rounded-md after:z-1 after:hidden hover:after:block group">
                    {/*Action  buttons */}
                    <div className="items-center gap-2 absolute top-4 right-4 z-10 bg-[#262626]/25 rounded-full py-2 px-5 backdrop-blur-sm hidden group-hover:flex">
                      {image.isInset ? (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="border-none size-8"
                          title="Full Screen"
                          onClick={handleToggleImageMode}
                        >
                          <RiFullscreenLine className="fill-white" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          title="Full Screen Exit"
                          className="border-none size-8"
                          onClick={handleToggleImageMode}
                        >
                          <RiFullscreenExitLine className="fill-white" />
                        </Button>
                      )}
                      <Button
                        asChild
                        type="button"
                        size="icon"
                        variant="ghost"
                        title="Edit image"
                        className="border-none size-8 cursor-pointer"
                      >
                        <label
                          tabIndex="0"
                          htmlFor="image"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              document.getElementById("image").click();
                            }
                          }}
                        >
                          <RiEditBoxLine className="fill-white" />
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                          />
                        </label>
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        title="Delete Image"
                        onClick={handleRemoveImage}
                        className="border-none size-8"
                      >
                        <RiDeleteBinLine className="fill-white" />
                      </Button>
                    </div>
                    <img
                      className="w-full aspect-video object-cover rounded-md"
                      src={image.src}
                      alt={image.alt}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-1 self-stretch pb-6 md:pb-0 px-6 md:px-16">
                <YooptaTextEditor
                  handleCharCount={handleCharCount}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "content",
                        value: value,
                      },
                    })
                  }
                  defaultValue={content}
                />
                {contentError.hasError && (
                  <p className="text-sm text-danger">{contentError.message}</p>
                )}
                <CharCountDisplay charCount={charsCount} maxChars={10000} />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="container pt-6">
          <Alert variant="info">
            <RiInformationLine />
            <AlertTitle>Log in Required</AlertTitle>
            <AlertDescription>
              You will be redirected to the home page in <b>{redirectTime}</b>{" "}
              seconds.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <SignInModal showModal={showModal} onCancel={() => setShowModal(false)} />
    </>
  );
};
