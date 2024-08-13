import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  validateTitle,
  validateContent,
  validateTag,
  validateForm,
} from "../utils/validateForm";
import { markdownToPlainText } from "../utils/markdownToPlainText";
import { handleFormChange } from "../utils/handleFormChange";
import { createPost } from "../services/createPost";
import { Form } from "../components/layout/Form";
import { handleUploadImage } from "../utils/handleUploadImage";

export const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const authorId = currentUser?.id;
  const authorName = currentUser?.name || "Anonymous";
  const authorImage = currentUser?.photoURL;
  const isGuest = currentUser?.isGuest;
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isImageRequired, setIsImageRequired] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "",
  });
  const { title, content, tag } = formData;
  const [errors, setErrors] = useState({
    title: {},
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
   * Convert Markdown to Plain Text
   * @returns {String} - Plain text content
   */
  const plainTextContent = markdownToPlainText(content || "");

  /**
   * Handle Inputs Change
   */
  const handleChange = (e) => {
    handleFormChange(
      e,
      formData,
      setFormData,
      isSubmitted,
      errors,
      setErrors,
      validateTitle,
      validateContent,
      validateTag,
      markdownToPlainText
    );
  };

  /**
   * Handle Image Change
   */
  const handleImageChange = (e) => {
    handleUploadImage({
      e,
      setImage,
      errors,
      setErrors,
      image,
      isImageRequired,
    });
  };

  /**
   * Remove the selected image
   */
  const handleRemoveImage = () => {
    setImage(null);
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
        content: plainTextContent,
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
      content,
      tag,
      image,
      authorId,
      authorName,
      authorImage,
      isGuest,
    });

    setImage(null); // Reset the image state

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
      content={content}
      image={image}
      tag={tag}
      onsubmit={handleCreatePost}
      onSelect={(e) => handleChange(e)}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleChange={handleChange}
      handleSelectRandomImage={() => setIsImageRequired(!isImageRequired)}
      isImageRequired={isImageRequired}
      errors={errors}
      redirectTime={redirectTime}
    />
  );
};
