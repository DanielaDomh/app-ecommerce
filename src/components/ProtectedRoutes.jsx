import { Outlet, Navigate } from "react-router-dom";


const ProtectRoutes = () => {
  const token = localStorage.getItem("token")
     if (token) {
         return <Outlet/>
     }else{
         return <Navigate to= "/Login"/>
     }
}

export default ProtectRoutes;