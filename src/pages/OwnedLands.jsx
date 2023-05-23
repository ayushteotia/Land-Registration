import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function OwnedLands() {
    const [account] = useState(window.localStorage.getItem("account_hash"));
    const [lands, setLands] = useState([]);

    useEffect(() => {
        return async () => {
            const landsCount = await app.methods.getLandsCount().call();
            for (let i = 1; i <= landsCount; i++) {
                const owner = await app.methods.getLandOwner(i).call();
                if (owner !== account) continue;
                const area = await app.methods.getArea(i).call();
                const city = await app.methods.getCity(i).call();
                const state = await app.methods.getState(i).call();
                const price = await app.methods.getPrice(i).call();
                const propertyPID = await app.methods.getPID(i).call();
                const surveyNum = await app.methods.getSurveyNumber(i).call();
                const image = await app.methods.getImage(i).call();
                setLands((lands) => [...lands, { area, city, state, price, propertyPID, surveyNum, image }]);
            }
        };
    }, [account]);

    return (
        <div id="wrapper">
            <Sidebar page="Lands" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 fw-semibold fs-4">Owned Lands</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Area</th>
                                                        <th scope="col">City</th>
                                                        <th scope="col">State</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Property PID</th>
                                                        <th scope="col">Survey Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lands.map((element, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{element.area}</td>
                                                            <td>{element.city}</td>
                                                            <td>{element.state}</td>
                                                            <td>{element.price}</td>
                                                            <td>{element.propertyPID}</td>
                                                            <td>{element.surveyNum}</td>
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

export default OwnedLands;
