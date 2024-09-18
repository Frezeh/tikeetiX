import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import { router } from "@/routes/router";
import { queryClient } from "@/services/query-client";
import { ProfileProvider } from "./provider/profile-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ProfileProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
