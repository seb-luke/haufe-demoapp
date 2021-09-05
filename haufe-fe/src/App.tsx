import './App.scss';
import React from "react";
import {AppHeader} from "./components/sections/app.header";
import {AppFooter} from "./components/sections/app.footer";
import {AppMain} from "./components/sections/app.main";
import {HTTP} from "./common/http";
import {StatusMessage} from "./components/domain/status-message.model";

interface StateModel {
    isLoading: boolean | undefined,
    isBackendHealthy: boolean | undefined
}

export class App extends React.Component<{}, StateModel> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: undefined,
            isBackendHealthy: undefined
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});

        HTTP.get('/health').then(
            (response: StatusMessage) => {
                this.setState((state, _) => ({
                    isBackendHealthy: response.status_code >= 200 && response.status_code < 300
                }));
            },
            (reason: any) => {
                console.error('Backend is not healthy:', reason);
                this.setState({
                    isBackendHealthy: false
                })
            }
        ).finally(() => this.setState({isLoading: false}))
    }

    render() {
        const isBackendHealthy = this.state.isBackendHealthy;

        return (
            <div className="fullscreen">
                <div className="d-flex h-100 text-center text-white bg-dark">
                    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <AppHeader/>

                        { isBackendHealthy ? <AppMain/> : <><h1>NOT ALLOWED</h1><h3>Backend is not healthy!</h3></>}

                        <AppFooter/>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
