import {
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { getTargetSnapShot } from "../utils/getTargetSnapShot";

/**
 * Fetches a paginated and optionally filtered list of posts from Firebase Firestore.
 *
 * - Retrieves posts based on `filterKey` and `currentPage`.
 * - On the first page, fetches posts with or without filtering by tag.
 * - For subsequent pages, fetches posts starting at a specific document obtained from `getTargetSnapShot`.
 * - Counts the total number of posts and updates it via `setTotalPosts`.
 *
 * @param {Object} postsQuery - Firestore collection reference.
 * @param {number} postsPerPage - Number of posts to fetch per page.
 * @param {string} filterKey - Key to filter posts by a specific tag.
 * @param {number} currentPage - Current page number for pagination.
 * @param {Function} setTotalPosts - Function to set the total number of posts.
 * @returns {Array<Object>} The fetched posts data.
 */

export const fetchPosts = async (
  postsQuery,
  postsPerPage,
  filterKey,
  currentPage,
  setTotalPosts
) => {
  // Create base queries
  const baseQuery = query(
    postsQuery.collection,
    orderBy("title", "asc"),
    limit(postsPerPage)
  );

  const filteredQuery =
    filterKey !== "all"
      ? query(baseQuery, where("tag", "==", filterKey))
      : baseQuery;

  // Fetch posts for the current page
  let postsSnapshot;
  let totalPostsSnapshot;
  if (currentPage === 1) {
    postsSnapshot = await getDocs(filteredQuery);
  } else {
    const target = await getTargetSnapShot(
      postsQuery,
      currentPage,
      postsPerPage
    );
    const paginatedQuery = query(filteredQuery, startAt(target));
    postsSnapshot = await getDocs(paginatedQuery);
  }

  // Determine the total number of posts based on filterKey
  const totalQuery =
    filterKey !== "all"
      ? query(
          postsQuery.collection,
          orderBy("title", "asc"),
          where("tag", "==", filterKey)
        )
      : query(postsQuery.collection, orderBy("title", "asc"));

  // Fetch total number of posts for pagination calculations
  totalPostsSnapshot = await getDocs(query(totalQuery));
  // Set the total number of posts
  setTotalPosts(totalPostsSnapshot.docs.length);
  // Return the fetched posts
  let posts = postsSnapshot.docs.map((doc) => doc.data());

  return posts;
};
