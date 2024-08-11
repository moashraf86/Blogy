import { Timestamp } from "firebase/firestore";

/**
 * Format Firestore Timestamp to a readable date string.
 * @param {Timestamp} timestamp - Firestore Timestamp object
 * @returns {string} - Formatted date string
 */
export const formatTimestamp = (timestamp) => {
  if (!(timestamp instanceof Timestamp)) {
    throw new Error("Invalid Timestamp object");
  }

  // Convert Timestamp to Date object
  const date = timestamp.toDate();

  // Define options for formatting
  const options = { year: "numeric", month: "short", day: "numeric" };

  // Format date to "Aug 9, 2024" format
  return date.toLocaleDateString("en-US", options);
};

// Example usage
// const exampleTimestamp = Timestamp.fromDate(new Date("2024-08-06T04:19:46Z"));
// console.log(formatTimestamp(exampleTimestamp)); // Outputs: "Aug 6, 2024"
