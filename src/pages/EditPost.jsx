import { useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { validateForm } from "../utils/validateForm";
import { Form } from "../components/layout/Form";
import { editPost } from "../services/editPost";
import { handleFormChange } from "../utils/handleFormChange";
import { handleUploadImage } from "../utils/handleUploadImage";
export const EditPost = () => {
  // Retrieve post ID from URL parameters
  const { id } = useParams();

  // Hook to programmatically navigate
  const navigate = useNavigate();

  /**
   * Prefetch post data using useLoaderData hook from react-router-dom
   * - The data is fetched using the `loader` function in the route configuration
   * @returns {Object} post - Post data
   */
  const { post } = useLoaderData();

  const [image, setImage] = useState({
    src: post?.image.src || null,
    alt: post?.image.alt || "",
    isInset: post?.image.isInset || true,
  });

  const [isImageRequired, setIsImageRequired] = useState(true);

  const [formData, setFormData] = useState({
    title: post?.title || "",
    description: post?.description || "",
    content: post ? JSON.parse(post.content) : {},
    tag: post?.tag || "",
  });

  const { title, description, content, tag } = formData;

  const [errors, setErrors] = useState({
    title: {},
    description: {},
    content: {},
    tag: {},
    image: {},
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handle input field changes
   */
  const handleChange = (e) => {
    handleFormChange(e, formData, setFormData, isSubmitted, errors, setErrors);
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
    setImage({ src: null, alt: "", isInset: true });
  };

  /**
   * Handle Toggle Image Mode
   * @param {Boolean} isInset - True if image is inset
   */
  const handleToggleImageMode = () => {
    setImage((prevImage) => ({ ...prevImage, isInset: !prevImage.isInset }));
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
        description,
        content,
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
      description,
      content: JSON.stringify(content),
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
      description={description}
      content={content}
      tag={tag}
      image={image}
      onsubmit={handleEditPost}
      onSelect={(e) => handleChange(e)}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleToggleImageMode={handleToggleImageMode}
      handleChange={handleChange}
      handleSelectRandomImage={() => setIsImageRequired(!isImageRequired)}
      isImageRequired={isImageRequired}
      errors={errors}
    />
  );
};
