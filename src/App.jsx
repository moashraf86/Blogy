import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "./components/layout/Header";
import { PostsProvider } from "./context/PostsContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeProviderContext";
import { CommentsProvider } from "./context/CommentsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "./utils/ScrollToTop";
import { EditPostSkeleton } from "./components/layout/EditPostSkeleton";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
export default function App() {
  const { state, location } = useNavigation();
  const currentLocation = useLocation();
  const loading = state === "loading";

  const [prevLocation, setPrevLocation] = useState(currentLocation);

  useEffect(() => {
    setPrevLocation(currentLocation);
  }, [currentLocation]);

  // check if the target route is the EditPost route
  const isNavigateToEditPost = location?.pathname?.startsWith("/edit/");

  // check if the previous route was the EditPost route
  const isPrevEditPost = prevLocation?.pathname.startsWith("/edit/");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PostsProvider>
        <AuthProvider>
          <Header />
          <QueryClientProvider client={queryClient}>
            <CommentsProvider>
              <ScrollToTop />
              {loading && isNavigateToEditPost && !isPrevEditPost ? (
                <EditPostSkeleton />
              ) : (
                <Outlet />
              )}
            </CommentsProvider>
          </QueryClientProvider>
        </AuthProvider>
      </PostsProvider>
    </ThemeProvider>
  );
}
