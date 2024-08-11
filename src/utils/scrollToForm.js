/**
 * Scroll to Form function
 * This function scrolls the page to the form section when called.
 * @param {Object} formRef - React Ref object
 */
export const scrollToForm = (formRef) => {
  if (formRef.current) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = formRef.current.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.log("Form Ref is null");
  }
};
