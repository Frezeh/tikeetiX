import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import { router } from "@/routes/router";
import { queryClient } from "@/services/query-client";
import { ProfileProvider } from "./provider/profile-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
