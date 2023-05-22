import { useState, useEffect } from "react";
import { app } from "../config";

function Cards() {
    const [account] = useState(window.localStorage.getItem("account_type"));
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        return async () => {
            const sellersCount = await app.methods.getSellersCount().call();
            const buyersCount = await app.methods.getBuyersCount().call();
            const landsCount = await app.methods.getLandsCount().call();
            const requestsCount = await app.methods.getRequestedLandsCount().call();
            if (account === "buyer") {
                setKeys(["Total Sellers", "Registered Land Counts", "Total Requests"]);
                setValues([sellersCount, landsCount, requestsCount]);
            } else if (account === "seller") {
                setKeys(["Total Buyers", "Registered Land Counts", "Total Requests"]);
                setValues([buyersCount, landsCount, requestsCount]);
            } else {
                setKeys(["Total Buyers", "Total Sellers", "Total Requests"]);
                setValues([buyersCount, sellersCount, requestsCount]);
            }
        };
    });

    return (
        <div className="row">
            <div className="col-xl-4 col-md-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="font-weight-bold text-primary text-uppercase mb-1">{keys[0]}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{values[0]}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-md-12 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="font-weight-bold text-success text-uppercase mb-1">{keys[1]}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{values[1]}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-landmark fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-md-12 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="font-weight-bold text-warning text-uppercase mb-1">{keys[2]}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{values[2]}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-bell fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
