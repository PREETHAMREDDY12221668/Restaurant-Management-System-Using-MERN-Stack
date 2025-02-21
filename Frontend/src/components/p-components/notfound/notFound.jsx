import React from "react";
import './notFound.css';
import { useNavigate } from "react-router-dom"; // Ensure correct package import

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="error-container">
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="link-container">
                <button
                    className="defbutton"
                    role="button"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>
        </>
    );
};

export default NotFound;
