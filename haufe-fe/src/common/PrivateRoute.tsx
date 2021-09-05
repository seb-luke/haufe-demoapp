import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {LoginContext, LoginContextType} from "../App";

export function PrivateRoute({children, ...rest}: React.PropsWithChildren<any>) {
    const loginContext: LoginContextType = useContext(LoginContext);

    return (
        <Route
            {...rest}
            render={
                ({location}) =>
                    loginContext.username ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location}
                            }}
                        />
                    )
            }
        />
    );
}