import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <div className="card mx-auto mt-5 py-4" style={{ width: "35rem" }}>
            <div className="text-center">
                <div className="error mx-auto" data-text="404">
                    404
                </div>
                <p className="lead text-gray-800 mb-5">Page Not Found</p>
                <p className="mb-2">It looks like you found a glitch in the matrix...</p>
                <Link to="/dashboard">&larr; Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default NoPage;
