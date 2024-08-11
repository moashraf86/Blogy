import { getDocs, query, orderBy } from "firebase/firestore";

/**
 *  Get Target snapShot for pagination based on page number
 * @param {object} postsQuery - The query object
 * @param {number} currentPage - The current page number
 * @param {number} postsPerPage - The number of posts per page
 * @returns {object} - The target snapshot object
 */
export const getTargetSnapShot = async (
  postsQuery,
  currentPage,
  postsPerPage
) => {
  const targetDoc = await getDocs(
    query(postsQuery.collection, orderBy("title", "asc"))
  );
  let targetSnapShot = targetDoc.docs[(currentPage - 1) * postsPerPage];
  return targetSnapShot;
};
