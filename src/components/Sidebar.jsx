import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ page }) {
    const [accountType] = useState(window.localStorage.getItem("account_type"));

    return (
        <div id="wrapper">
            <ul className="navbar-nav sidebar sidebar-dark">
                <span className="sidebar-brand d-flex align-items-center justify-content-center">
                    <span className="fs-4">{page}</span>
                </span>

                <hr className="sidebar-divider" />

                {accountType === "admin" ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/buyerinfo">
                                <i className="fas fa-fw fa-user"></i>
                                <span>Buyer Info</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sellerinfo">
                                <i className="fas fa-fw fa-user"></i>
                                <span>Seller Info</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/transactioninfo">
                                <i className="fas fa-fw fa-paper-plane"></i>
                                <span>Transaction Info</span>
                            </Link>
                        </li>
                    </>
                ) : accountType === "buyer" ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">
                                <i className="fas fa-fw fa-image"></i>
                                <span>Land Gallery</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                <i className="fas fa-fw fa-user"></i>
                                <span>Profile</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/lands">
                                <i className="fas fa-fw fa-landmark"></i>
                                <span>Owned Lands</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/payment">
                                <i className="fas fa-fw fa-dollar-sign"></i>
                                <span>Payment</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/faq">
                                <i className="fas fa-fw fa-info"></i>
                                <span>Help</span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">
                                <i className="fas fa-fw fa-image"></i>
                                <span>Land Gallery</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                <i className="fas fa-fw fa-user"></i>
                                <span>Profile</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/addland">
                                <i className="fas fa-fw fa-landmark"></i>
                                <span>Add Land</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/landrequest">
                                <i className="fas fa-fw fa-id-card"></i>
                                <span>Land Requests</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/faq">
                                <i className="fas fa-fw fa-info"></i>
                                <span>Help</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
