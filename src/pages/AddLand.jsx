import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";
import { getHash } from "../getIPFS";

function AddLand() {
    const to = useNavigate();
    const [account] = useState(window.localStorage.getItem("account_hash"));
    const [isVerified, setIsVerified] = useState(null);
    const [isRejected, setIsRejected] = useState(null);
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [price, setPrice] = useState("");
    const [propertyPID, setPropertyPID] = useState("");
    const [surveyNum, setSurveyNum] = useState("");
    const [imageData, setImageData] = useState(null);
    const [aadharData, setAadharData] = useState(null);

    useEffect(() => {
        return async () => {
            const isVerified = await app.methods.isVerified(account).call();
            setIsVerified(isVerified);
            const isRejected = await app.methods.isRejected(account).call();
            setIsRejected(isRejected);
        };
    });

    const parse = async (file, id) => {
        const data = new FormData();
        data.append("file", file);
        if (id === "aadharcard") setAadharData(data);
        else if (id === "image") setImageData(data);
    };

    const addLand = async () => {
        const aadhar = await getHash(aadharData);
        const image = await getHash(imageData);

        if (area === "" || city === "" || state === "" || price === "" || propertyPID === "" || surveyNum === "") {
            alert("All the fields are compulsory!");
        } else if (!Number(area) || !Number(price)) {
            alert("Land area and Price of Land must be a number!");
        } else {
            await app.methods
                .addLand(area, city, state, price, propertyPID, surveyNum, image, aadhar)
                .send({
                    from: account,
                    gas: 2100000,
                })
                .then(() => {
                    to("/dashboard");
                });
            //Reload
            window.location.reload(false);
        }
    };

    return (
        <div id="wrapper">
            <Sidebar page="Add Land" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container bg-white my-4 py-4">
                        {isVerified ? (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="area" className="form-label text-black">
                                        Area (in sqm.)
                                    </label>
                                    <input type="text" className="form-control" id="area" onChange={(e) => setArea(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label text-black">
                                        City
                                    </label>
                                    <input type="text" className="form-control" id="city" onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label text-black">
                                        State
                                    </label>
                                    <input type="text" className="form-control" id="state" onChange={(e) => setState(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label text-black">
                                        Price
                                    </label>
                                    <input type="text" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pid" className="form-label text-black">
                                        Property PID Number
                                    </label>
                                    <input type="text" className="form-control" id="pid" onChange={(e) => setPropertyPID(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="survey" className="form-label text-black">
                                        Physical Survey Number
                                    </label>
                                    <input type="text" className="form-control" id="survey" onChange={(e) => setSurveyNum(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label text-black">
                                        Land Image
                                    </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={(e) => parse(e.target.files[0], e.target.id)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="aadharcard" className="form-label text-black">
                                        Land Data (PDF)
                                    </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="aadharcard"
                                        accept="application/pdf"
                                        onChange={(e) => parse(e.target.files[0], e.target.id)}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary col-12" onClick={addLand}>
                                    Add Land
                                </button>
                            </form>
                        ) : isRejected ? (
                            <span className="fs-4">Account Rejected</span>
                        ) : (
                            <span className="fs-4">Account Not Verified</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddLand;
