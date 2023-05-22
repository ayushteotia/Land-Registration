import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";

function Gallery() {
    const [lands, setLands] = useState([]);

    useEffect(() => {
        return async () => {
            const landsCount = await app.methods.getLandsCount().call();
            for (let i = 1; i <= landsCount; i++) {
                const area = await app.methods.getArea(i).call();
                const city = await app.methods.getCity(i).call();
                const state = await app.methods.getState(i).call();
                const price = await app.methods.getPrice(i).call();
                const propertyPID = await app.methods.getPID(i).call();
                const surveyNum = await app.methods.getSurveyNumber(i).call();
                const image = await app.methods.getImage(i).call();
                const document = await app.methods.getDocument(i).call();
                setLands((lands) => [...lands, { area, city, state, price, propertyPID, surveyNum, image, document }]);
            }
        };
    }, []);

    return (
        <div id="wrapper">
            <Sidebar page="Gallery" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid d-grid">
                        <div className="row">
                            {lands.map((element, index) => (
                                <div className="col-lg-4 mb-4" key={index}>
                                    <div className="card">
                                        <img src={process.env.REACT_APP_IPFS_URL + element.image} className="card-img-top" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title text-dark fw-bold fs-3">{element.area} Sq. m.</h5>
                                            <p className="card-subtitle">
                                                {element.city}, {element.state}
                                            </p>
                                            <br />
                                            <span className="text-dark">PID: {element.propertyPID}</span>
                                            <br />
                                            <span className="text-dark">Survey No.: {element.surveyNum}</span>
                                            <br />
                                            <span className="text-dark fw-semibold fs-5">Price: ₹{element.price}</span>
                                            <br />
                                            <br />
                                            <a
                                                href={process.env.REACT_APP_IPFS_URL + element.document}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-primary"
                                            >
                                                View Land Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
