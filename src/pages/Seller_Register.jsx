import { useState } from "react";
import getWeb3 from "../getWeb3";
import { app } from "../config";
import { getHash } from "../getIPFS";
import { useMetamask } from "../connectWallet";

function Seller() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [ownedLands, setOwnedLands] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [documentData, setDocumentData] = useState(null);
    const { handleOnboarding } = useMetamask();

    const parse = async (file) => {
        const data = new FormData();
        data.append("file", file);
        setDocumentData(data);
    };

    const registerSeller = async () => {
        const web3 = getWeb3();
        const account = await web3.eth.getAccounts();
        const document = await getHash(documentData);

        if (name === "" || age === "" || aadharNumber === "" || panNumber === "") {
            alert("All the fields are compulsory!");
        } else if (!Number(aadharNumber) || aadharNumber.length !== 12) {
            alert("Aadhar Number should be 12 digits long!");
        } else if (panNumber.length !== 10) {
            alert("Pan Number should be a 10 digit unique number!");
        } else if (!Number(age) || age < 18) {
            alert("Your age must be a number");
        } else {
            await app.methods
                .registerSeller(name, age, aadharNumber, panNumber, ownedLands, document)
                .send({
                    from: account[0],
                    gas: 2100000,
                })
                .then(() => handleOnboarding());
        }
    };

    return (
        <div className="card mx-auto mt-5" style={{ width: "35rem" }}>
            <div className="card-body">
                <h5 className="card-title fs-1 text-black text-center">Seller Registration</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-black">
                            Full Name
                        </label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="age" className="form-label text-black">
                            Age
                        </label>
                        <input type="text" className="form-control" id="age" onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="aadhar" className="form-label text-black">
                            Aadhar Number
                        </label>
                        <input type="text" className="form-control" id="aadhar" onChange={(e) => setAadharNumber(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pan" className="form-label text-black">
                            Pan Number
                        </label>
                        <input type="text" className="form-control" id="pan" onChange={(e) => setPanNumber(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lands" className="form-label text-black">
                            Owned Lands
                        </label>
                        <input type="text" className="form-control" id="lands" onChange={(e) => setOwnedLands(e.target.value)} />
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

                    <button type="button" className="btn btn-primary col-12" onClick={registerSeller}>
                        Register as Seller
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Seller;
