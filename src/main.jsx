import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetails from "./Pages/UserDetails";
import ContextProvider from "./context/ContextProvider.jsx";
import EditForm from "./Pages/EditForm.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/user-detail/:id",
    element: <UserDetails></UserDetails>,
  },
  {
    path: "/edit-user/:id/:type",
    element: <EditForm></EditForm>,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
