import { FunctionComponent } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../..";
import { IProtectedRouteProps } from "../../types-and-interfacese/interfaces";


export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({children, path, isAuth}) => {
  const isAuthorized = useAppSelector(store => store.user.isAuthorized);
  const location = useLocation();
  const from = location.state?.from || '/';
  let { state } = useLocation();
  const a = {
    ...state,
    from: location
  } 
  console.log(location);
  
  console.log(from);
  
  if(isAuth && !isAuthorized) {
    return <Navigate to={'/login'} state={{ from: location }} />
  } 

  if(!isAuth && isAuthorized) {
    return <Navigate to={ from } />
  }
  return children ? children : <Outlet />
}