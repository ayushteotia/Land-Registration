function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">Welcome, {window.localStorage.getItem("account_name")}</li>
            </ul>
        </nav>
    );
}

export default Navbar;
