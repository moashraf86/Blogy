export const calculateReadTime = (content) => {
  const wordsPerMinute = 200; // Average reading speed (can be adjusted)
  const totalWords = content.split(/\s+/g).length; // Count the words by splitting on spaces
  const readTime = Math.ceil(totalWords / wordsPerMinute); // Calculate the read time, rounded up
  return `${readTime}`;
};
