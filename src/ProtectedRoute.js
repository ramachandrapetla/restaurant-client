import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({children, isAuthenticated, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() => {
                return isAuthenticated === true ? (
                children
                ) : (
                <Redirect to="/login" />
                );
            }}
        />
    )
}

export default ProtectedRoute;