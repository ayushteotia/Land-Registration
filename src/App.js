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

function App() {
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
