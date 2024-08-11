/**
 * Handle form change for Create and Edit Post
 */
export const handleFormChange = (
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
) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  if (isSubmitted) {
    let validationErrors = errors;
    if (name === "title") validationErrors.title = validateTitle(value);
    if (name === "content")
      validationErrors.content = validateContent(markdownToPlainText(value));
    if (name === "tag") validationErrors.tag = validateTag(value);
    setErrors(validationErrors);
  }
};
