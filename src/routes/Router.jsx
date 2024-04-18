import {createBrowserRouter} from 'react-router-dom';

import Dashboard from "../components/Dashboard"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import ForgotPassword from "../components/ForgotPassword"
import UpdateProfile from "../components/UpdateProfile"
import Signup from "../components/Signup"
import NotesModule from "../components/Notes/NotesModule.jsx";


const router = createBrowserRouter([
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },
    {
        element: <PrivateRoute/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>,
                children: [
                    {
                        path: '/notes',
                        element: <NotesModule/>
                    },
                ]
            },
            {
                path: "/update-profile",
                element: <UpdateProfile/>
            },
            {}

        ]
    }
])

export default router;
