import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Register from "../pages/Register";
import Login from "../pages/Login";
import { adminPaths } from "./admin.routes";
import { routesGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/admin",
      element: <ProtectedRoute>
        <App/>
      </ProtectedRoute>,
      children: routesGenerator(adminPaths)
    },
    {
      path: "/faculty",
      element: <App/>,
      children: routesGenerator(facultyPaths)
    },
    {
      path: "/student",
      element: <App/>,
      children: routesGenerator(studentPaths)
    },
   
    {
      path: "/register", //absolute path
      element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
  ]);

export default router