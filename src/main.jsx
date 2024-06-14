import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreatePost } from "./components/CreatePost.jsx";
import { EditPost } from "./components/EditPost.jsx";
import { Post } from "./components/Post.jsx";
import { Bookmarks } from "./components/Bookmarks.jsx";
import { Posts } from "./components/posts.jsx";
import { MyPosts } from "./components/MyPosts.jsx";
import { UserProfile } from "./components/UserProfile.jsx";
import "remixicon/fonts/remixicon.css";
import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      { path: "/", element: <Posts /> },
      { path: "/post/:id", element: <Post /> },
      { path: "/create", element: <CreatePost /> },
      { path: "/edit/:id", element: <EditPost /> },
      { path: "/bookmarks", element: <Bookmarks /> },
      { path: "/my-posts", element: <MyPosts /> },
      { path: "/users/:id", element: <UserProfile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
