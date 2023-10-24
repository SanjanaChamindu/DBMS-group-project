import React, { useState } from 'react';
import DropdownMenu from '../components/common/dropdownGroupBy';

const EmployeeReports = () => {
    const [selectedDept, setSelectedDept] = useState(null); // Assuming you want to track the selected department

    return (
        <div className='reports'>
            <h1 className='paragraph'>Group Employee Reports</h1>
            <div className='dropdown'>
                <DropdownMenu items={groupBy} path={`/dashboard/viewEmpReports`} onSelect={setSelectedDept} />
            </div>
        </div>
    );
}

export default EmployeeReports;

const groupBy=[
    {
        ietm_id:1,
        item_name:'Department'
    },
    {
        ietm_id:2,
        item_name:'Job Title'
    },
    {
        ietm_id:3,
        item_name:'Pay Grade'
    },
    {
        item_id:4,
        item_name:'Employment Status'
    }
]