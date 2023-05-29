import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function BuyerInfo() {
    const [account] = useState(window.localStorage.getItem("account_hash"));

    const verifyBuyer = (address) => async () => {
        await app.methods.verifyBuyer(address).send({
            from: account,
            gas: 2100000,
        });
        //Reload
        window.location.reload(false);
    };

    const rejectBuyer = (address) => async () => {
        await app.methods.verifyBuyer(address).send({
            from: account,
            gas: 2100000,
        });
        //Reload
        window.location.reload(false);
    };

    useEffect(() => {
        return async () => {
            const buyersCount = await app.methods.getBuyersCount().call();
            const buyers = await app.methods.getBuyer().call();
            for (let i = 0; i < buyersCount; i++) {
                const buyer = await app.methods.getBuyerDetails(buyers[i]).call();
                const isVerified = await app.methods.isVerified(buyers[i]).call();
                const isRejected = await app.methods.isRejected(buyers[i]).call();
                if (isVerified || isRejected) continue;
                const row = document.createElement("tr");
                row.innerHTML = `<td>${i + 1}.</td><td>${buyers[i]}</td><td>${buyer[0]}</td><td>${buyer[5]}</td><td>${buyer[4]}</td><td>${
                    buyer[1]
                }</td><td>${buyer[6]}</td><td>${buyer[2]}</td><td><a
                href="${process.env.REACT_APP_IPFS_URL}${
                    buyer[3]
                }" target="_blank" rel="noreferrer" class="btn btn-primary-outline btn-sm">View</a></td><td>${
                    isVerified ? "Verified" : isRejected ? "Rejected" : "Not Verified"
                }</td><td><button id="verify" class="btn btn-primary btn-sm">Verify</button></td><td><button id="reject" class="btn btn-danger btn-sm">Reject</button></td>`;
                document.getElementById("buyers").appendChild(row);
                document.getElementById("verify").onclick = verifyBuyer(buyers[i]);
                document.getElementById("reject").onclick = rejectBuyer(buyers[i]);
                document.getElementById("verify").disabled = isVerified || isRejected;
                document.getElementById("reject").disabled = isVerified || isRejected;
            }
        };
    });

    return (
        <div id="wrapper">
            <Sidebar page="Buyer Info" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 fw-semibold fs-4">Buyer Info</h6>
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
                                                        <th scope="col">Email</th>
                                                        <th scope="col">City</th>
                                                        <th scope="col">Aadhar No.</th>
                                                        <th scope="col">Pan No.</th>
                                                        <th scope="col">Aadhar PDF</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Verify</th>
                                                        <th scope="col">Reject</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="buyers"></tbody>
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

export default BuyerInfo;
