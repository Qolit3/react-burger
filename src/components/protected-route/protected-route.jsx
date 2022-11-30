import { Navigate, Outlet, useLocation } from "react-router-dom"


export const ProtectedRoute = ({children, path, isAuth}) => {
  
  const location = useLocation();
  console.log(path)
  console.log(location)

  if(!isAuth) {
    return <Navigate to={path} state={location.pathname} />
  } 
  return children ? children : <Outlet />
}