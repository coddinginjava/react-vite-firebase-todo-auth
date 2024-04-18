import './App.css'

import {AuthProvider} from "../context/AuthContext"
import {RouterProvider} from "react-router-dom";
import router from "../routes/Router"


function App() {
    return (
        <div>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </div>
    )
}

export default App
