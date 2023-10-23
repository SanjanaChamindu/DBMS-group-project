import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

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
                {editEmployee ? <h1>Editing {storedEmployee.employee_name}</h1> : <h1>Viewing {storedEmployee.employee_name}</h1>}
            </div>
            <Link to="/dashboard/employee-details/view-all-employees">
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    );
}

export default Employee;