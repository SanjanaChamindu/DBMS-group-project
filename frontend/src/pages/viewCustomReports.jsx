import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const CusRepEmp = () => {
    const location = useLocation();
    let item;
    
    if (location.state) {
        ({item} = location.state);
    }

    // Define a state to store the item
    const [storedItem, setStoredItem] = useState(item);

    useEffect(() => {
        if (item) {
            // If item is passed in location state, update setStoredItem
            setStoredItem(item);
        }
    }, [item]);

    console.log("inside",storedItem);

    return (
        <React.Fragment>
            <div style={{ color: "#fff" }}>
                <h1>Viewing Reports of custom field {storedItem.item_name}</h1>
            </div>
            <Link to="/dashboard/reports/custom-report">
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    );
}

export default CusRepEmp;