import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function TransactionInfo() {
    const [account] = useState(window.localStorage.getItem("account_hash"));
    const [lands, setLands] = useState([]);

    useEffect(() => {
        return async () => {
            const count = await app.methods.getLandsCount().call();
            for (let i = 1; i <= count; i++) {
                if (!(await app.methods.isRequested(i).call())) continue;
                const request = await app.methods.getRequestDetails(i).call();
                const isPaid = await app.methods.isPaid(i).call();
                const owner = await app.methods.getLandOwner(i).call();
                const area = await app.methods.getArea(i).call();
                const city = await app.methods.getCity(i).call();
                const state = await app.methods.getState(i).call();
                const price = await app.methods.getPrice(i).call();
                const propertyPID = await app.methods.getPID(i).call();
                const surveyNum = await app.methods.getSurveyNumber(i).call();
                setLands((lands) => [...lands, { area, city, state, price, propertyPID, surveyNum, owner, isPaid, newOwner: request[1] }]);
            }
        };
    }, []);

    const landTransfer = async (landId, newOwner) => {
        await app.methods.LandOwnershipTransfer(landId, newOwner).send({
            from: account,
            gas: 2100000,
        });
    };

    return (
        <div id="wrapper">
            <Sidebar page="Transactions" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 fw-semibold fs-4">Land Info</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Owner ID</th>
                                                        <th scope="col">Area</th>
                                                        <th scope="col">City</th>
                                                        <th scope="col">State</th>
                                                        <th scope="col">Price (in ₹)</th>
                                                        <th scope="col">Property PID</th>
                                                        <th scope="col">Survey Number</th>
                                                        <th scope="col">Verify Land Transfer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lands.map((element, index) => (
                                                        <tr key={index}>
                                                            <th>{index + 1}</th>
                                                            <td>{element.owner}</td>
                                                            <td>{element.area}</td>
                                                            <td>{element.city}</td>
                                                            <td>{element.state}</td>
                                                            <td>{element.price}</td>
                                                            <td>{element.propertyPID}</td>
                                                            <td>{element.surveyNum}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => landTransfer(index + 1, element.newOwner)}
                                                                    disabled={!element.isPaid}
                                                                >
                                                                    Verify Transaction
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

export default TransactionInfo;
