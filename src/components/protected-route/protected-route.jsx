import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"


export const ProtectedRoute = ({children, path, isAuth}) => {
  const isAuthorized = useSelector(store => store.user.isAuthorized);
  const location = useLocation();
  const route = location.state ? location.state : path
  const sum = isAuth ? !isAuthorized : isAuthorized;
  
  if(sum) {
    return <Navigate to={route} state={location.pathname} />
  } 
  return children ? children : <Outlet />
}