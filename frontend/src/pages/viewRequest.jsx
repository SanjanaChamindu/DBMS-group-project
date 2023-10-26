import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const ViewRequest = () => {
    const location = useLocation();
    let leave,leaves_page = false;
    
    if (location.state) {
        ({ leave,leaves_page} = location.state);
    }

    // Define a state to store the leave
    const [storedLeave, setStoredLeave] = useState(leave);

    useEffect(() => {
        if (leave) {
            // If leave is passed in location state, update setStoredLeave
            setStoredLeave(leave);
        }
    }, [leave]);

    const path = leaves_page ? "/dashboard/leaves" : "/dashboard/leave-requests";
    return (
        <React.Fragment>
            <div style={{ color: "#fff" }}>
                <h1>Viewing {storedLeave.request_id} </h1>
            </div>
            <Link to={path}>
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    )
}

export default ViewRequest;