import {LoginContext, LoginContextType} from "../App";
import React, {useContext, useState} from "react";
import {Redirect, useLocation} from "react-router-dom";

export function LoginComponent() {
    const loginContext: LoginContextType = useContext(LoginContext);

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [username, setUsernameInputField] = useState('');
    const {state} = useLocation<{ from: string }>();

    if (redirectToReferrer) {
        return <Redirect to={state?.from || '/'}/>
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username) {
            loginContext.doLogin(username);
            setRedirectToReferrer(true);
        } else {
            console.error('Username cannot be empty');
            //TODO handle error appropriately
        }
    }

    const handleUsernameInput = ({target}: React.ChangeEvent<HTMLInputElement>) => setUsernameInputField(target.value)

    return (
        <div>
            <p>Please log in:</p>
            <form onSubmit={handleLogin} className="row">
                <label htmlFor="username" className="visually-hidden">Username</label>
                <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" id="username" className="form-control rounded" placeholder="Please insert your username"
                           value={username} onChange={handleUsernameInput}/>
                    <button type="submit" className="col-auto ms-3 btn btn-light rounded" value="Login">Login</button>
                </div>
            </form>
        </div>
    )
}