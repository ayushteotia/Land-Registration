// import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Buyer from "./pages/Buyer_Register";
import Seller from "./pages/Seller_Register";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import OwnedLands from "./pages/OwnedLands";
import BuyerInfo from "./pages/BuyerInfo";
import SellerInfo from "./pages/SellerInfo";
import TransactionInfo from "./pages/TransactionInfo";
import AddLand from "./pages/AddLand";
import LandRequest from "./pages/LandRequest";
import Faq from "./pages/Faq";
import NoPage from "./pages/404";
// import getWeb3 from "./getWeb3";
// import { app } from "./config";

function App() {
    // useEffect(() => {
    //     return async () => {
    //         const web3 = getWeb3();
    //         let accounts = await web3.eth.getAccounts();
    //         console.log(web3);
    //         if (accounts.length <= 0) {
    //             await web3.eth.requestAccounts();
    //             accounts = (await web3.eth.getAccounts())[0];
    //         }
    //         console.log(accounts);
    // if (
    //     window.localStorage.getItem("account_hash") !== accounts[0] ||
    //     !window.localStorage.getItem("account_type") ||
    //     !window.localStorage.getItem("account_name")
    // ) {
    //     let user = ["Admin"];
    //     const isLandInspector = await app.methods.isLandInspector(accounts[0]).call();
    //     if (isLandInspector) {
    //         window.localStorage.setItem("account_type", "admin");
    //         window.localStorage.setItem("account_hash", accounts[0]);
    //         window.localStorage.setItem("account_name", user[0]);
    //     } else {
    //         const isBuyer = await app.methods.isBuyer(accounts[0]).call();
    //         if (isBuyer) {
    //             user = await app.methods.getBuyerDetails(accounts[0]).call();
    //             window.localStorage.setItem("account_type", "buyer");
    //             window.localStorage.setItem("account_hash", accounts[0]);
    //             window.localStorage.setItem("account_name", user[0]);
    //         } else {
    //             const isSeller = await app.methods.isSeller(accounts[0]).call();
    //             if (isSeller) {
    //                 user = await app.methods.getSellerDetails(accounts[0]).call();
    //                 window.localStorage.setItem("account_type", "seller");
    //                 window.localStorage.setItem("account_hash", accounts[0]);
    //                 window.localStorage.setItem("account_name", user[0]);
    //             } else {
    //                 window.localStorage.clear();
    //             }
    //         }
    //     }
    //             window.ethereum.on("accountsChanged", (accounts) => {
    //                 window.location.replace("/dashboard");
    //             });
    //         }
    //     };
    // });

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/buyer" element={<Buyer />} />
                <Route path="/seller" element={<Seller />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/lands" element={<OwnedLands />} />
                <Route path="/buyerinfo" element={<BuyerInfo />} />
                <Route path="/sellerinfo" element={<SellerInfo />} />
                <Route path="/transactioninfo" element={<TransactionInfo />} />
                <Route path="/addland" element={<AddLand />} />
                <Route path="/landrequest" element={<LandRequest />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
