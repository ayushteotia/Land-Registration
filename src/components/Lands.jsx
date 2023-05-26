import { useState, useEffect } from "react";
import { app } from "../config";

function Lands() {
    const [account] = useState(window.localStorage.getItem("account_type"));
    const [address] = useState(window.localStorage.getItem("account_hash"));
    const [isVerified, setIsVerified] = useState(null);
    const [isRejected, setIsRejected] = useState(null);
    const [lands, setLands] = useState([]);

    useEffect(() => {
        return async () => {
            const isVerified = await app.methods.isVerified(address).call();
            setIsVerified(isVerified);
            const isRejected = await app.methods.isRejected(address).call();
            setIsRejected(isRejected);
            const landsCount = await app.methods.getLandsCount().call();
            for (let i = 1; i <= landsCount; i++) {
                const owner = await app.methods.getLandOwner(i).call();
                if (owner.toUpperCase() === address.toUpperCase()) continue;
                const area = await app.methods.getArea(i).call();
                const city = await app.methods.getCity(i).call();
                const state = await app.methods.getState(i).call();
                const price = await app.methods.getPrice(i).call();
                const propertyPID = await app.methods.getPID(i).call();
                const surveyNum = await app.methods.getSurveyNumber(i).call();
                const image = await app.methods.getImage(i).call();
                const document = await app.methods.getDocument(i).call();
                const requested = await app.methods.isRequested(i).call();
                setLands((lands) => [...lands, { area, city, state, price, propertyPID, surveyNum, image, document, requested }]);
            }
        };
    }, [address]);

    const requestLand = async (land_id) => {
        const seller_address = await app.methods.getLandOwner(land_id).call();
        await app.methods
            .requestLand(seller_address, land_id)
            .send({
                from: address,
                gas: 2100000,
            })
            .then(() => window.location.reload());
    };

    if (account === "admin") {
        return <></>;
    } else if (account === "buyer") {
        return (
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 fw-semibold fs-4">Lands Info</h6>
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
                                            <th scope="col">Request Land</th>
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
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => requestLand(index + 1)}
                                                        disabled={(!isVerified && !isRejected) || element.requested}
                                                    >
                                                        Request
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
        );
    } else {
        return (
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 fw-semibold fs-4">Lands Info</h6>
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
        );
    }
}

export default Lands;
