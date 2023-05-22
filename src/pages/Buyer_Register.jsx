import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getWeb3 from "../getWeb3";
import { app } from "../config";
import { getHash } from "../getIPFS";

function Buyer() {
    const to = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [documentData, setDocumentData] = useState(null);
    const [email, setEmail] = useState("");

    const parse = async (file) => {
        const data = new FormData();
        data.append("file", file);
        setDocumentData(data);
    };

    const registerBuyer = async () => {
        const web3 = getWeb3();
        const account = await web3.eth.getAccounts();
        const document = await getHash(documentData);

        var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if (name === "" || age === "" || city === "" || aadharNumber === "" || panNumber === "") {
            alert("All the fields are compulsory!");
        } else if (!Number(aadharNumber) || aadharNumber.length !== 12) {
            alert("Aadhar Number should be 12 digits long!");
        } else if (panNumber.length !== 10) {
            alert("Pan Number should be a 10 digit unique number!");
        } else if (!Number(age) || age < 18) {
            alert("Your age must be a number");
        } else if (email === "" || !pattern.test(email)) {
            alert("Please enter a valid email address\n");
        } else {
            await app.methods
                .registerBuyer(name, age, city, aadharNumber, panNumber, document, email)
                .send({
                    from: account[0],
                    gas: 2100000,
                })
                .then(() => to("/dashboard"));
        }
    };

    return (
        <div className="card mx-auto mt-5" style={{ width: "35rem" }}>
            <div className="card-body">
                <h5 className="card-title fs-1 text-black text-center">Buyer Registration</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-black">
                            Full Name
                        </label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="age" className="form-label text-black">
                            Age
                        </label>
                        <input type="text" className="form-control" id="age" onChange={(e) => setAge(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="city" className="form-label text-black">
                            City
                        </label>
                        <input type="text" className="form-control" id="city" onChange={(e) => setCity(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-black">
                            Email
                        </label>
                        <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="aadhar" className="form-label text-black">
                            Aadhar Number
                        </label>
                        <input type="text" className="form-control" id="aadhar" onChange={(e) => setAadharNumber(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pan" className="form-label text-black">
                            Pan Number
                        </label>
                        <input type="text" className="form-control" id="pan" onChange={(e) => setPanNumber(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label text-black">
                            Aadhar Card (PDF Format)
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            accept="application/pdf"
                            onChange={(e) => parse(e.target.files[0])}
                        />
                    </div>

                    <button type="button" className="btn btn-primary col-12" onClick={registerBuyer}>
                        Register as Buyer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Buyer;
