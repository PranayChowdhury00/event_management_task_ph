import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/404/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import Events from "../pages/Events/Events";
import AddEvent from "../pages/AddEvent/AddEvent";
import MyEvents from "../pages/MyEvents/MyEvents";


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
        path:"/events",
        element:<PrivateRoute>
          <Events></Events>
        </PrivateRoute>
      },
      {
        path:"/add-event",
        element:<PrivateRoute>
          <AddEvent></AddEvent>
        </PrivateRoute>
      },
      {
        path:"/my-events",
        element:<PrivateRoute>
          <MyEvents></MyEvents>
        </PrivateRoute>
      },
    ]
  },
  {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },

]);
export default router;
