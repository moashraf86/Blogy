import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  validateTitle,
  validateContent,
  validateTag,
  validateForm,
} from "../utils/validateForm";
import { Form } from "../components/layout/Form";
import { markdownToPlainText } from "../utils/markdownToPlainText";
import { editPost } from "../services/editPost";
import { useFetchPost } from "../hooks/useFetchPost";
import { handleFormChange } from "../utils/handleFormChange";
import { handleUploadImage } from "../utils/handleUploadImage";

export const EditPost = () => {
  const { id } = useParams(); // Retrieve post ID from URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch post data using custom hook
  const { data: post } = useFetchPost(id);

  // Initialize state with default values; updated once post data is available
  const [image, setImage] = useState(null);
  const [isImageRequired, setIsImageRequired] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "",
  });
  const { title, content, tag } = formData;
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    tag: "",
    image: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Update formData state when post data is available
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        tag: post.tag || "",
      });
      setImage(post.image || null);
    }
  }, [post]);

  /**
   * Convert Markdown to Plain Text
   * @returns {String} - Plain text content
   */
  const plainTextContent = markdownToPlainText(content || "");

  /**
   * Handle input field changes
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
   * Handle image change
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
   * Handle removal of the selected image
   */
  const handleRemoveImage = () => {
    setImage(null);
  };

  /**
   * Handle post update submission
   */
  const handleEditPost = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitted(true); // Set form submission status

    /**
     * Validate form inputs and update errors state
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

    // Call editPost service with updated data
    editPost({
      id,
      title,
      content,
      tag,
      image,
    });

    // Navigate to the home page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <Form
      heading="Edit Post"
      title={title}
      content={content}
      tag={tag}
      image={image}
      onsubmit={handleEditPost}
      onSelect={(e) => handleChange(e)}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleChange={handleChange}
      handleSelectRandomImage={() => setIsImageRequired(!isImageRequired)}
      isImageRequired={isImageRequired}
      errors={errors}
    />
  );
};
