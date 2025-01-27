import { createBrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Onboarding from "./onboarding/onboarding";
import ForgotPassword from "./forgot-password/forgot-password";
import ResetPassword from "./reset-password/reset-password";
import ErrorPage from "./error-page";
import Root from "./root";
import Dashboard from "./dashboard/dashboard";
import Movies from "./movies/movies";
import ManageOrders from "./manage-orders/manage-orders";
import Marketing from "./marketing/marketing";
import Finance from "./finance/finance";
import Reporting from "./reporting/reporting";
import Settings from "./settings/settings";
import CreateMovie from "./create-movie/create-movie";
import MovieDetails from "./movie-details/movie-details";
import EditMovie from "./edit-movie/edit-movie";
import Events from "./events/events";
import CreateEvent from "./create-event/create-event";
import EventDetails from "./event-details/event-details";
import EditEvent from "./edit-event/edit-event";
import ManageWithdrawalAccounts from "./finance/manage-withdrawal-accounts";

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
    path: "auth/code",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "/marketing",
        element: <Marketing />,
      },
      {
        path: "/finance",
        element: <Finance />,
      },
      {
        path: "/finance/withdraw-accounts",
        element: <ManageWithdrawalAccounts />,
      },
      {
        path: "/reporting",
        element: <Reporting />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/create-movie",
        element: <CreateMovie />,
      },
      {
        path: "/movie-details/:id",
        element: <MovieDetails />,
      },
      {
        path: "/edit-movie/:id",
        element: <EditMovie />,
      },
      {
        path: "/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
      },
      {
        path: "/edit-event/:id",
        element: <EditEvent />,
      },
    ],
  },
]);
