import { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { validateForm } from "../utils/validateForm";
import { Form } from "../components/layout/Form";
import { editPost } from "../services/editPost";
import { handleFormChange } from "../utils/handleFormChange";
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

  const [isImageRequired, setIsImageRequired] = useState(true);

  const [formData, setFormData] = useState({
    title: post?.title || "",
    description: post?.description || "",
    content: post ? JSON.parse(post.content) : {},
    tag: post?.tag || "",
    image: post?.image || {
      src: null,
      alt: "",
      isInset: true,
    },
  });

  const { title, description, content, tag, image } = formData;

  const [errors, setErrors] = useState({
    title: {},
    description: {},
    content: {},
    tag: {},
    image: {},
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Remove form data from local storage on component unmount
   * - This ensures that the form data is not persisted across sessions
   */
  useEffect(() => {
    return () => {
      localStorage.removeItem("formData");
    };
  }, []);
  /**
   * Handle input field changes
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
   * Handle removal of the selected image
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
   * @param {Boolean} isInset - True if image is inset
   */
  const handleToggleImageMode = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: {
        ...prevData.image,
        isInset: !prevData.image.isInset,
      },
    }));
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

    // Clear form data from local storage
    localStorage.removeItem("formData");

    // Navigate to the home page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <Form
      title={title}
      description={description}
      content={content}
      tag={tag}
      image={image}
      submitLabel={"Update"}
      onsubmit={handleEditPost}
      onSelect={(e) => handleChange(e)}
      handleRemoveImage={handleRemoveImage}
      handleToggleImageMode={handleToggleImageMode}
      handleChange={handleChange}
      handleSelectRandomImage={() => setIsImageRequired(!isImageRequired)}
      isImageRequired={isImageRequired}
      errors={errors}
    />
  );
};
