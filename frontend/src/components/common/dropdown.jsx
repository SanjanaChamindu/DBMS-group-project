import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dropdown.css';

const DropdownMenu = (props) => {
    const navigate = useNavigate(); // Initialize navigate function
    const { items } = props;
    const [selectedDept, setSelectedDept] = useState(null);

    const handleItemClick = (item) => {
        setSelectedDept(item);
    }
    
    const navigateTo = (item) => {
        if (!item) return;
        console.log("navigate called",item);
        navigate(`/dashboard/deptEmployees`, { state: { item } });
    }
    
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedDept ? selectedDept.dept_name : 'Select Department'}
            </button>
            <ul className="dropdown-menu">
                {items.map(item => (
                    <li key={item.dept_id}>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleItemClick(item)}
                        >
                            {item.dept_name}
                        </a>
                    </li>
                ))}
            </ul>
            <div>
                <button className="btn btn-primary" type="button" onClick={() => {props.onSelect(selectedDept); navigateTo(selectedDept);}}>Generate</button>
            </div>
        </div>
    );
}

export default DropdownMenu;