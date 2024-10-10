import {
  validateTag,
  validateTitle,
  validateDescription,
  validateContent,
  validateImage,
} from "./validateForm";
import { isValidImageUrl } from "./isValidImageUrl";
/**
 * Handle form change for Create and Edit Post
 */
export const handleFormChange = (
  e,
  formData,
  setFormData,
  isSubmitted,
  isImageRequired,
  errors,
  setErrors
) => {
  const { name, value } = e.target;

  // set image reader to read the image file
  if (name === "image") {
    if (value.src instanceof File) {
      const image = value.src;
      let validationErrors = { ...errors };
      validationErrors.image = validateImage(image, isImageRequired);
      setErrors(validationErrors);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () =>
        setFormData((prevData) => ({
          ...prevData,
          image: {
            src: reader.result,
            alt: value.alt,
            isInset: true,
          },
        }));
    } else {
      // check if the provided url is valid of an image
      isValidImageUrl(value.src).then((isValid) => {
        let validationErrors = { ...errors };
        validationErrors.image = validateImage(value.src, isImageRequired);
        setErrors(validationErrors);
        if (isValid) {
          setFormData((prevData) => ({
            ...prevData,
            image: {
              src: value.src,
              alt: value.alt,
              isInset: true,
            },
          }));
        } else {
          // set error message if the url is not valid
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: {
              hasError: true,
              message: "Invalid image URL",
            },
          }));
        }
      });
    }
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // store formData in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
  }

  // validate the form fields once the form is submitted
  if (isSubmitted) {
    let validationErrors = { ...errors };
    switch (name) {
      case "title":
        validationErrors.title = validateTitle(value);
        break;
      case "description":
        validationErrors.description = validateDescription(value);
        break;
      case "content":
        validationErrors.content = validateContent(value);
        break;
      case "tag":
        validationErrors.tag = validateTag(value);
        break;
      case "image":
        validationErrors.image = validateImage(value.src, isImageRequired);
        break;
      default:
        break;
    }
    setErrors(validationErrors);
  }
};
