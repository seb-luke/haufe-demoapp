import React from "react";

export class AppMain extends React.Component<{}, {}> {
    render() {
        return (
            <main className="px-3">
                <h1>Haufe Group - FE app</h1>
                <p className="lead">Welcome to this main page! :)</p>
                <p className="lead">
                    <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
                </p>
            </main>
        )
    }
}