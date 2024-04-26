import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

interface Props {
    children: JSX.Element;
}

export const RequireAuthPage = ({children}: Props) =>{
    const location = useLocation();
    const auth = useAuth();

    if (!auth?.isLoggedIn()) {
        return <Navigate to="/board" state={{ from: location }} />;
    }
    else{
        return children;
    }
}

export const RequireAuthComponent = ({children}: Props) =>{
    const auth = useAuth();

    if (!auth?.isLoggedIn()) {
        return null;
    }
    else{
        return children;
    }
}