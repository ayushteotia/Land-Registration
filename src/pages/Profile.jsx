import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function Profile() {
    const [account] = useState(window.localStorage.getItem("account_hash"));
    const [account_type] = useState(window.localStorage.getItem("account_type"));
    const [user, setUser] = useState([]);
    const [isVerified, setIsVerified] = useState(null);
    const [isRejected, setIsRejected] = useState(null);

    useEffect(() => {
        return async () => {
            if (account_type === "buyer") {
                const user = await app.methods.getBuyerDetails(account).call();
                setUser(user);
                const isVerified = await app.methods.isVerified(account).call();
                setIsVerified(isVerified);
                const isRejected = await app.methods.isRejected(account).call();
                setIsRejected(isRejected);
                console.log(user);
            } else if (account_type === "seller") {
                const user = await app.methods.getSellerDetails(account).call();
                setUser(user);
                const isVerified = await app.methods.isVerified(account).call();
                setIsVerified(isVerified);
                const isRejected = await app.methods.isRejected(account).call();
                setIsRejected(isRejected);
            } else {
                setUser(["Admin"]);
            }
        };
    }, [account, account_type]);

    // const editProfile = () => {
    //     const fields = document.getElementsByTagName("input");
    //     for (let i = 1; i < fields.length - 2; i++) fields[i].removeAttribute("readOnly");
    //     document.getElementById("edit").hidden = true;
    //     document.getElementById("update").hidden = false;
    // };

    // const updateProfile = async () => {
    //     if (account_type === "buyer") {
    //     } else if (account_type === "seller") {
    //     }
    //     const fields = document.getElementsByTagName("input");
    //     for (let i = 1; i < fields.length - 2; i++) fields[i].setAttribute("readOnly", true);
    //     document.getElementById("edit").hidden = false;
    //     document.getElementById("update").hidden = true;
    // };

    return (
        <div id="wrapper">
            <Sidebar page="Profile" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container bg-white my-4 py-4">
                        {isVerified ? (
                            <span className="badge text-bg-success mb-4 fs-5">Verified</span>
                        ) : isRejected ? (
                            <span className="badge text-bg-danger mb-4 fs-5">Rejected</span>
                        ) : (
                            <span className="badge text-bg-danger mb-4 fs-5">Not Verified</span>
                        )}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label text-black">
                                    Wallet Address
                                </label>
                                <input type="text" className="form-control" id="address" defaultValue={account} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-black">
                                    Full Name
                                </label>
                                <input type="text" className="form-control" id="name" defaultValue={user[0]} readOnly />
                            </div>
                            {account_type === "buyer" ? (
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label text-black">
                                        Age
                                    </label>
                                    <input type="text" className="form-control" id="age" defaultValue={user[5]} readOnly />
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label text-black">
                                        Age
                                    </label>
                                    <input type="text" className="form-control" id="age" defaultValue={user[1]} readOnly />
                                </div>
                            )}
                            {account_type === "buyer" ? (
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label text-black">
                                        City
                                    </label>
                                    <input type="text" className="form-control" id="city" defaultValue={user[1]} readOnly />
                                </div>
                            ) : (
                                <></>
                            )}
                            {account_type === "buyer" ? (
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-black">
                                        Email
                                    </label>
                                    <input type="email" className="form-control" id="email" defaultValue={user[4]} readOnly />
                                </div>
                            ) : (
                                <></>
                            )}
                            {account_type === "seller" ? (
                                <div className="mb-3">
                                    <label htmlFor="lands" className="form-label text-black">
                                        Owned Lands
                                    </label>
                                    <input type="text" className="form-control" id="lands" defaultValue={user[4]} readOnly />
                                </div>
                            ) : (
                                <></>
                            )}
                            {account_type === "buyer" ? (
                                <div className="mb-3">
                                    <label htmlFor="aadhar" className="form-label text-black">
                                        Aadhar Number
                                    </label>
                                    <input type="text" className="form-control" id="aadhar" defaultValue={user[6]} readOnly />
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <label htmlFor="aadhar" className="form-label text-black">
                                        Aadhar Number
                                    </label>
                                    <input type="text" className="form-control" id="aadhar" defaultValue={user[2]} readOnly />
                                </div>
                            )}
                            {account_type === "buyer" ? (
                                <div className="mb-3">
                                    <label htmlFor="pan" className="form-label text-black">
                                        Pan Number
                                    </label>
                                    <input type="text" className="form-control" id="pan" defaultValue={user[2]} readOnly />
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <label htmlFor="pan" className="form-label text-black">
                                        Pan Number
                                    </label>
                                    <input type="text" className="form-control" id="pan" defaultValue={user[3]} readOnly />
                                </div>
                            )}
                            {account_type === "buyer" ? (
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label text-black">
                                        Aadhar Card (PDF Format)
                                    </label>
                                    <br />
                                    <a
                                        href={process.env.REACT_APP_IPFS_URL + user[3]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary-outline"
                                    >
                                        View
                                    </a>
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label text-black">
                                        Aadhar Card (PDF Format)
                                    </label>
                                    <br />
                                    <a
                                        href={process.env.REACT_APP_IPFS_URL + user[5]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary-outline"
                                    >
                                        View
                                    </a>
                                </div>
                            )}

                            {/* <button type="button" id="edit" className="btn btn-primary col-12" onClick={editProfile} disabled={!isVerified}>
                                Edit Profile
                            </button>
                            <button type="button" id="update" className="btn btn-primary col-12" onClick={updateProfile} hidden>
                                Update
                            </button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
