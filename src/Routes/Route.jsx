import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/404/NotFound";


const router = createBrowserRouter([
  {
    path:"*",
    element:<NotFound></NotFound>
  },
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  },
]);
export default router;
