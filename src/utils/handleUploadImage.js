/**
 * Handle image upload for Create and Edit Post
 */
import { validateImage } from "./validateForm";
export const handleUploadImage = ({
  e,
  setImage,
  errors,
  setErrors,
  image,
  isImageRequired = true,
}) => {
  const file = e.target.files[0] || image.src;
  const validationErrors = { ...errors };
  validationErrors.image = validateImage(file, isImageRequired);
  setErrors(validationErrors);

  if (file && file.size < 1000000) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>
      setImage({
        src: reader.result,
        alt: file.name,
        isInset: true,
      });
  }
};
