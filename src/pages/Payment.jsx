import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { app } from "../config";
import getWeb3 from "../getWeb3";

function Payment() {
    const [account] = useState(window.localStorage.getItem("account_hash"));
    const [lands, setLands] = useState([]);

    useEffect(() => {
        return async () => {
            const count = await app.methods.getLandsCount().call();
            for (let i = 1; i <= count; i++) {
                const owner = await app.methods.getLandOwner(i).call();
                if (!(await app.methods.isApproved(i).call()) || owner === account) continue;
                const price = await app.methods.getPrice(i).call();
                const isPaid = await app.methods.isPaid(i).call();
                setLands((lands) => [...lands, { owner, price, isPaid }]);
            }
        };
    }, []);

    const makePayment = async (seller_address, amount, land_id) => {
        console.log(amount, typeof amount);
        amount *= 0.0000057;
        await app.methods.payment(seller_address, land_id).send({
            from: account,
            value: getWeb3().utils.toWei(amount.toString(), "ether"),
            gas: 2100000,
        });
    };

    return (
        <div id="wrapper">
            <Sidebar page="Payment" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 fw-semibold fs-4">Land Payments</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Land Owner</th>
                                                        <th scope="col">Price (in ₹)</th>
                                                        <th scope="col">Make Payment</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lands.map((element, index) => (
                                                        <tr key={index}>
                                                            <th>{index + 1}</th>
                                                            <td>{element.owner}</td>
                                                            <td>{element.price}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => makePayment(element.owner, element.price, index + 1)}
                                                                    disabled={element.isPaid}
                                                                >
                                                                    Pay
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

export default Payment;
