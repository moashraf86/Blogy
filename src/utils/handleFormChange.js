import {
  validateTag,
  validateTitle,
  validateDescription,
  validateContent,
} from "./validateForm";
/**
 * Handle form change for Create and Edit Post
 */
export const handleFormChange = (
  e,
  formData,
  setFormData,
  isSubmitted,
  errors,
  setErrors
) => {
  const { name, value } = e.target;

  setFormData((pervData) => ({
    ...pervData,
    [name]: value,
  }));

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
      default:
        break;
    }
    setErrors(validationErrors);
  }
};
