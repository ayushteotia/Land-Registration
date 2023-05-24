import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function LandRequest() {
    const [address] = useState(window.localStorage.getItem("account_hash"));
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        return async () => {
            const requestsCount = await app.methods.getRequestsCount().call();
            for (let i = 1; i <= requestsCount; i++) {
                const request = await app.methods.getRequestDetails(i).call();
                const approved = await app.methods.isApproved(i).call();
                if (address === request[0]) {
                    request[4] = approved;
                    setRequests((requests) => [...requests, request]);
                }
            }
        };
    }, [address]);

    const approveRequest = async (id) => {
        await app.methods
            .approveRequest(id)
            .send({
                from: address,
                gas: 2100000,
            })
            .then(() => window.location.reload());
    };

    return (
        <div id="wrapper">
            <Sidebar page="Requests" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid d-grid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 fw-semibold fs-4">Requests Info</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Buyer ID</th>
                                                        <th scope="col">Land ID</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Approve Request</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {requests.map((element, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>
                                                            <td>{element[3].toString()}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => approveRequest(index + 1)}
                                                                    disabled={element[4]}
                                                                >
                                                                    Approve
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
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

export default LandRequest;
