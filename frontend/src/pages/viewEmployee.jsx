import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router

const ViewEmployee = () => {
    const handleEditClick = () => {
        setIsEditing(true);
    };
    return (
        <React.Fragment>
            <h1>View and Edit Employee</h1>
            <Link to="/allEmployee"> {/* Use Link instead of a regular <a> tag */}
                <Button>Back</Button>
            </Link>
            {console.log("view employee page")}
        </React.Fragment>
    );
}

export default ViewEmployee;