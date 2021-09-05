import './App.scss';
import React from "react";
import {AppHeader} from "./components/sections/app.header";
import {AppFooter} from "./components/sections/app.footer";
import {AppMain} from "./components/sections/app.main";


export class App extends React.Component<{}, {}> {

    render() {
        return (
            <div className="fullscreen">
                <div className="d-flex h-100 text-center text-white bg-dark">
                    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <AppHeader/>

                        <AppMain/>

                        <AppFooter/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
