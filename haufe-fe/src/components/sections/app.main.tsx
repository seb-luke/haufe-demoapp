import React from "react";
import {HTTP} from "../../common/http";
import {StatusMessage} from "../domain/status-message.model";
import {HomeComponent} from "../home/Home.component";
import {HealthCheckErrorComponent} from "../error/HealthCheckError.component";
import { Route, Switch } from "react-router-dom";
import {RestrictedComponent} from "../restricted/Restricted.component";
import {LoginComponent} from "../../common/Login.component";
import {PrivateRoute} from "../../common/PrivateRoute";

interface StateModel {
    isLoading: boolean | undefined,
    isBackendHealthy: boolean | undefined
}

export class AppMain extends React.Component<{}, StateModel> {

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
            <main className="px-3">
                <Switch>
                    <PrivateRoute path={'/restricted'}><RestrictedComponent/></PrivateRoute>
                    <Route path={'/login'}><LoginComponent/></Route>
                    <Route path="/">
                        { isBackendHealthy ? <HomeComponent/> : <HealthCheckErrorComponent/>}
                    </Route>
                </Switch>
            </main>
        )
    }
}