/**
 * Calculate the total number of characters in the content
 */
export const calcContentChars = (content) => {
  let contentChars = "";
  Object.values(content).forEach((block) => {
    const blockValue = block.value;
    if (blockValue) {
      blockValue.forEach((value) => {
        const children = value.children;
        if (children) {
          children.forEach((child) => {
            contentChars += child.text;
          });
        }
      });
    }
  });
  return contentChars;
};
