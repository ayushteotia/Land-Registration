import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Lands from "../components/Lands";

function Dashboard() {
    return (
        <div id="wrapper">
            <Sidebar page="Dashboard" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <Cards />
                        <Lands />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
