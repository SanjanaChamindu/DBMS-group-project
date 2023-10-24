import React, { useState } from 'react';
import DropdownMenu from '../components/common/dropdownGroupBy';
import { getCustomFields } from '../services/fakeCustomFields';

const CustomReports = () => {
    const [selectedDept, setSelectedDept] = useState(null); // Assuming you want to track the selected department

    const custom = getCustomFields();

    return (
        <div className='reports'>
            <h1 className='paragraph'>Generate Reports Based On Custom Fields</h1>
            <div className='dropdown'>
                <DropdownMenu items={custom} path={`/dashboard/viewCustomReports`} onSelect={setSelectedDept} />
            </div>
        </div>
    );
}

export default CustomReports;