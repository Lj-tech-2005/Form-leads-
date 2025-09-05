import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLeads from "./pages/AddLeads";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/leads", element: <Leads /> },
        { path: "/addleads", element: <AddLeads /> }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
