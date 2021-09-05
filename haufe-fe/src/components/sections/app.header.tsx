import {Link, NavLink} from "react-router-dom";
import './app.header.scss';

interface propsModel {
    username: string | undefined
}

export function AppHeader({username}: propsModel) {
    return (
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">Haufe Group</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink className="nav-link" exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/restricted">Restricted</NavLink>

                    <div className="user-section">
                        {
                            username
                                ? <span className="welcome-user">Hello, {username}</span>
                                : <Link className="nav-link login" to="/login">Login</Link>
                        }
                    </div>
                </nav>

            </div>
        </header>
    )
}