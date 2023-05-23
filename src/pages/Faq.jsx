import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Faq() {
    const data = [
        {
            title: "What are the prerequisites for using the system?",
            content: "You need Metamask Browser Extension added and Ganache for running the system on a local Ethereum Blockchain.",
        },
        {
            title: "How can I understand the working of the system?",
            content: "You can watch the demo video uploaded above on this page.",
        },
        {
            title: "What do I register for?",
            content: "If you own a land and want to sell it, Register as a Buyer and if you want to buy a land, Register as a Buyer.",
        },
        {
            title: "Why can't I request for a Land Property after registering as Buyer?",
            content: "Your account profile and documents will first be verified by the Land Inspector and then you can request a Land.",
        },
        {
            title: "Why can't I add a Land Property after registering as Seller?",
            content: "Same answer as above!",
        },
    ];

    return (
        <div id="wrapper">
            <Sidebar page="Faq" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container">
                        <h1 className="display-4 text-center mb-4">Frequently Asked Questions</h1>
                        <div className="accordion" id="accordionExample">
                            {data.map((row, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={"heading" + index}>
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={"#item" + index}
                                            aria-expanded="false"
                                            aria-controls={index}
                                        >
                                            <strong>{row.title}</strong>
                                        </button>
                                    </h2>
                                    <div
                                        id={"item" + index}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={"heading" + index}
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">{row.content}</div>
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

export default Faq;
