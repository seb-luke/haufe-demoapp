import './App.scss';
import React from "react";
import {AppHeader} from "./components/sections/app.header";
import {AppFooter} from "./components/sections/app.footer";
import {AppMain} from "./components/sections/app.main";

interface StateModel {
    loggedInUsername: string,
    doLogin: (_: string) => void
}

export type LoginContextType = {username: string, doLogin: (_: string) => void}
export const LoginContext: React.Context<LoginContextType> = React.createContext({
    username: undefined,
    doLogin: _ => {}
});

export class App extends React.Component<{}, StateModel> {

    private readonly doLogin;

    constructor(props: React.PropsWithoutRef<{}>) {
        super(props);

        this.doLogin = (loggedInUsername: string) => this.setState({loggedInUsername})

        this.state = {
            loggedInUsername: undefined,
            doLogin: this.doLogin
        }
    }

    render() {
        const loggedInUsername = this.state.loggedInUsername;
        const doLogin = this.state.doLogin;

        return (
            <div className="fullscreen">
                <div className="d-flex h-100 text-center text-white bg-dark">
                    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <LoginContext.Provider value={{username: loggedInUsername, doLogin}}>
                            <AppHeader username={loggedInUsername}/>
                            <AppMain/>
                            <AppFooter/>
                        </LoginContext.Provider>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
