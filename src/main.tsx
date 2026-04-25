import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App";
import CustomerList from "./components/customers/CustomerList";
import TrainingList from "./components/trainings/TrainingList";

// Define all routes here in one place as objects
const router = createBrowserRouter([
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
