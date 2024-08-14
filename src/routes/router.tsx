import { createBrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Onboarding from "./onboarding/onboarding";
import ForgotPassword from "./forgot-password/forgot-password";
import ResetPassword from "./reset-password/reset-password";
import ErrorPage from "./error-page";
import Root from "./root";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "onboarding",
    element: <Onboarding />,
    errorElement: <ErrorPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
