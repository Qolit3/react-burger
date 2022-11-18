import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoute = ({children, path, isAuth}) => {
  
  if(!isAuth) {
    return <Navigate to={path} replace={true} />
  } 
  return children ? children : <Outlet />
}