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
  },
  {
    path: "onboarding",
    element: <Onboarding />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
