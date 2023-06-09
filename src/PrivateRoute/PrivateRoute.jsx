import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
const isAuth = useSelector(state=> state.info.autorizated)

    return isAuth ? children :<Navigate to='/registr'/>
}
export default PrivateRoute