import React, { useState } from 'react';
import DropdownMenu from '../components/common/dropdown';
import { getDepts } from '../services/fakeDeptService';
import './css/LeaveByDept.css';

const LeavesByDept = () => {
    const [selectedDept, setSelectedDept] = useState(null); // Assuming you want to track the selected department

    const depts = getDepts(); // Assuming getDepts returns an array of department items
    console.log(selectedDept);

    return (
        <div className='reports'>
            <h1 className='paragraph'>View Leaves By Department</h1>
            <div className='dropdown'>
                <DropdownMenu items={depts} path={`/dashboard/deptLeaves`}  onSelect={setSelectedDept} />
            </div>
        </div>
    );
}

export default LeavesByDept;