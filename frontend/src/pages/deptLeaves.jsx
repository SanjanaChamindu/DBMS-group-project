import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const DeptLeaves = () => {
    const location = useLocation();
    let passingData;
    
    if (location.state) {
        ({passingData} = location.state);
    }

    // Define a state to store the item
    const [storedItem, setStoredItem] = useState(passingData);

    useEffect(() => {
        if (passingData) {
            // If passingData is passed in location state, update setStoredItem
            setStoredItem(passingData);
        }
    }, [passingData]);

    console.log("inside",storedItem);

    return (
        <React.Fragment>
            <div style={{ color: "#fff" }}>
                <h1>Viewing Leaves of {storedItem.selectedDept.dept_name} from {storedItem.selectedStart} to {storedItem.selectedEnd}</h1>
            </div>
            <Link to="/dashboard/reports/leaves-by-dept">
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    );
}

export default DeptLeaves;