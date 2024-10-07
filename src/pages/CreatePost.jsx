import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateForm } from "../utils/validateForm";
import { handleFormChange } from "../utils/handleFormChange";
import { createPost } from "../services/createPost";
import { Form } from "../components/layout/Form";
import { EditorInitialValue } from "../utils/editorInitialValue";

export const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const authorId = currentUser?.id;
  const authorName = currentUser?.name || "Anonymous";
  const authorImage = currentUser?.photoURL;
  const isGuest = currentUser?.isGuest;
  const navigate = useNavigate();
  const [isImageRequired, setIsImageRequired] = useState(true);
  const formDataFromLocalStorage = JSON.parse(localStorage.getItem("formData"));
  const { localTitle, localDescription, localContent, localTag, localImage } =
    formDataFromLocalStorage || {};

  const [formData, setFormData] = useState(
    formDataFromLocalStorage || {
      title: localTitle || "",
      description: localDescription || "",
      content: localContent || EditorInitialValue,
      tag: localTag || "",
      image: localImage || {
        src: null,
        alt: "",
        isInset: true,
      },
    }
  );

  const { title, description, content, tag, image } = formData;
  const [errors, setErrors] = useState({
    title: {},
    description: {},
    content: {},
    tag: {},
    image: {},
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [redirectTime, setRedirectTime] = useState(5);

  /**
   * Redirect to the home page if user is not logged in
   */
  useEffect(() => {
    if (!currentUser) {
      let time = 5;
      const intervalId = setInterval(() => {
        setRedirectTime((prevTime) => prevTime - 1);
        time -= 1;
        if (time === 0) {
          clearInterval(intervalId);
          navigate("/");
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [currentUser]);

  /**
   * Handle Inputs Change
   */
  const handleChange = (e) => {
    handleFormChange(
      e,
      formData,
      setFormData,
      isSubmitted,
      isImageRequired,
      errors,
      setErrors
    );
  };

  /**
   * Remove the selected image
   */
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: {
        src: null,
        alt: "",
        isInset: true,
      },
    });
  };

  /**
   * Handle Toggle Image Mode
   */
  const handleToggleImageMode = () => {
    setFormData({
      ...formData,
      image: {
        ...formData.image,
        isInset: !formData.image.isInset,
      },
    });
  };

  /**
   * Handle Create Post
   */
  const handleCreatePost = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitted(true); // Set form submission status
    /**
     * Validate Form Inputs
     * @returns {Boolean} - True if all inputs are valid
     */
    if (
      !validateForm({
        title,
        description,
        content,
        tag,
        image,
        isImageRequired,
        setErrors,
      })
    )
      return;

    // Create a new post with the form data
    createPost({
      title,
      description,
      content: JSON.stringify(content),
      tag,
      image,
      authorId,
      authorName,
      authorImage,
      isGuest,
    });

    handleRemoveImage; // Remove the selected image
    localStorage.removeItem("formData"); // Remove formData from localStorage
    // Redirect to the home page after creating the post
    setTimeout(() => {
      // Navigate to the home page if user is not a guest
      if (!isGuest) navigate("/");
      // Navigate to the profile page if user is a guest
      else navigate("/drafts");
    }, 300);
  };

  return (
    <Form
      title={title}
      description={description}
      content={content}
      tag={tag}
      image={image}
      submitLabel={"Publish"}
      onsubmit={handleCreatePost}
      onSelect={(e) => handleChange(e)}
      // handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleToggleImageMode={handleToggleImageMode}
      handleChange={handleChange}
      handleSelectRandomImage={() => setIsImageRequired(!isImageRequired)}
      isImageRequired={isImageRequired}
      errors={errors}
      redirectTime={redirectTime}
    />
  );
};
