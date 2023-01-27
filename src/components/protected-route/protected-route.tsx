import { FunctionComponent } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../..";
import { IProtectedRouteProps } from "../../types_and_interfacese/interfaces";


export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({children, path, isAuth}) => {
  const isAuthorized = useAppSelector(store => store.user.isAuthorized);
  const location = useLocation();
  const route: string = location.state ? location.state : path
  const sum: boolean = isAuth ? !isAuthorized : isAuthorized;
  
  if(sum) {
    return <Navigate to={route} state={location.pathname} />
  } 
  return children ? children : <Outlet />
}