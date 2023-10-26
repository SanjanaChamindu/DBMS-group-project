import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const RepEmployees = () => {
    const location = useLocation();
    let passingData;
    
    if (location.state) {
        ({passingData} = location.state);
    }

    // Define a state to store the item
    const [storedItem, setStoredItem] = useState(passingData);

    useEffect(() => {
        if (passingData) {
            // If item is passed in location state, update setStoredItem
            setStoredItem(passingData);
        }
    }, [passingData]);

    console.log("inside",storedItem);
    const {dept_id,dept_name} = storedItem.selectedDept;
    const {job_title_id,job_title_name} = storedItem.selectedJob;
    const {item_id,item_name} = storedItem.selectedGender;


    return (
        <React.Fragment>
            <div style={{ color: "#fff" }}>
                <h1>Viewing employee Reports of {dept_name},{job_title_name} and {item_name}</h1>
            </div>
            <Link to="/dashboard/reports/employee-reports">
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    );
}

export default RepEmployees;