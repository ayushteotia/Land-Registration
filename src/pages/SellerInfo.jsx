import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function SellerInfo() {
    const [account] = useState(window.localStorage.getItem("account_hash"));

    const verifySeller = (address) => async () => {
        await app.methods.verifySeller(address).send({
            from: account,
            gas: 2100000,
        });
        //Reload
        window.location.reload(false);
    };

    const rejectSeller = (address) => async () => {
        await app.methods.rejectSeller(address).send({
            from: account,
            gas: 2100000,
        });
        //Reload
        window.location.reload(false);
    };

    useEffect(() => {
        return async () => {
            const sellerCount = await app.methods.getSellersCount().call();
            const sellers = await app.methods.getSeller().call();
            for (let i = 0; i < sellerCount; i++) {
                const seller = await app.methods.getSellerDetails(sellers[i]).call();
                const isVerified = await app.methods.isVerified(sellers[i]).call();
                const isRejected = await app.methods.isRejected(sellers[i]).call();
                if (isVerified || isRejected) continue;
                const row = document.createElement("tr");
                row.innerHTML = `<td>${i + 1}.</td><td>${sellers[i]}</td><td>${seller[0]}</td><td>${seller[1]}</td><td>${seller[4]}</td><td>${
                    seller[2]
                }</td><td>${seller[3]}</td><td><a href="${process.env.REACT_APP_IPFS_URL}${
                    seller[5]
                }" target="_blank" rel="noreferrer" class="btn btn-primary-outline btn-sm">View</a></td><td>${
                    isVerified ? "Verified" : isRejected ? "Rejected" : "Not Verified"
                }</td><td><button id="verify" class="btn btn-primary btn-sm">Verify</button></td><td><button id="reject" class="btn btn-danger btn-sm">Reject</button></td>`;
                document.getElementById("sellers").appendChild(row);
                document.getElementById("verify").onclick = verifySeller(sellers[i]);
                document.getElementById("reject").onclick = rejectSeller(sellers[i]);
                document.getElementById("verify").disabled = isVerified || isRejected;
                document.getElementById("reject").disabled = isVerified || isRejected;
            }
        };
    });

    return (
        <div id="wrapper">
            <Sidebar page="Seller Info" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 fw-semibold fs-4">Seller Info</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Account Address</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Age</th>
                                                        <th scope="col">Owned Lands</th>
                                                        <th scope="col">Aadhar No.</th>
                                                        <th scope="col">Pan No.</th>
                                                        <th scope="col">Aadhar PDF</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Verify</th>
                                                        <th scope="col">Reject</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="sellers"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerInfo;
