import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Profileview from './profileviewemp';

const Employee = () => {
    const location = useLocation();
    let employee, edit;
    
    if (location.state) {
        ({ employee, edit } = location.state);
    }

    // Define a state to store the employee
    const [storedEmployee, setStoredEmployee] = useState(employee);
    const [editEmployee, setEditEmployee] = useState(edit);

    useEffect(() => {
        if (employee) {
            // If employee is passed in location state, update storedEmployee and editEmployee
            setStoredEmployee(employee);
            setEditEmployee(edit);
        }
    }, [employee, edit]);

    return (
        <React.Fragment>
            <div style={{ color: "#fff" }}>
                <Profileview isEditing={editEmployee} />
            </div>
            <Link to="/dashboard/employee-details/view-all-employees">
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    );
}

export default Employee;