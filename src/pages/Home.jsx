import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMetamask } from "../connectWallet";

function Home() {
    const to = useNavigate();
    const [auth, setAuth] = useState("");
    const [address] = useState(window.localStorage.getItem("account_hash") || null);
    const { handleOnboarding } = useMetamask();

    useEffect(() => {
        return () => {
            const user_type = window.localStorage.getItem("account_type");
            if (user_type) {
                to("/dashboard");
                window.location.reload();
            }
        };
    });

    return (
        <div className="container">
            <h1 className="display-2 text-white text-center">Land Registry using Ethereum Blockchain</h1>
            <br />
            <div className="card mx-auto" style={{ width: "35rem" }}>
                <div className="card-body">
                    <h5 className="card-title fs-1 text-black">Welcome</h5>
                    <h6 className="card-subtitle mb-2 fs-4 text-black">Making the most of digital era!</h6>
                    <hr />
                    <form>
                        <div className="mb-3">
                            <label htmlFor="selectionBox" className="form-label text-black">
                                Select Role
                            </label>
                            <select
                                className="form-select"
                                id="selectionBox"
                                defaultValue="select"
                                aria-label="Select Role"
                                onChange={(e) => setAuth(e.target.value)}
                            >
                                <option value="select" disabled>
                                    Select
                                </option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <Link to={auth} className="btn btn-primary col-12">
                            Register
                        </Link>
                    </form>
                    {!address ? (
                        <button className="btn btn-success col-12 mt-2" onClick={handleOnboarding}>
                            Connect
                        </button>
                    ) : (
                        <span className="badge rounded-pill text-bg-success">{address}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
