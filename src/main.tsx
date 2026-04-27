import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App";
import CustomerList from "./components/customers/CustomerList";
import TrainingList from "./components/trainings/TrainingList";
import CalendarPage from "./components/calendar/CalendarPage";
import StatsPage from "./components/stats/StatsPage";

// Define all routes here in one place as objects
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <CustomerList />,
        },
        {
          path: "trainings",
          element: <TrainingList />,
        },
        {
          path: "calendar",
          element: <CalendarPage />,
        },
        {
          path: "stats",
          element: <StatsPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
