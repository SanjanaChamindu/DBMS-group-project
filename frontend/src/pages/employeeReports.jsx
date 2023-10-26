import React, { useState } from 'react';
import DropdownMenu from '../components/common/dropdownGroupBy';
import { getJobTitles } from '../services/jobTitles';

const EmployeeReports = () => {
    const [selectedDept, setSelectedDept] = useState(null); // Assuming you want to track the selected department
    const Job_titles=getJobTitles();

    return (
        <div className='reports'>
            <h1 className='paragraph'>Group Employee Reports</h1>
            <span className='dropdown'>
                <DropdownMenu items={groupBy} path={`/dashboard/viewEmpReports`} onSelect={setSelectedDept} />
            </span>

            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    {selectedDept ? selectedDept.dept_name : 'Select Department'}
            </button>
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    {selectedDept ? selectedDept.dept_name : 'Select Department'}
            </button>
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    {selectedDept ? selectedDept.dept_name : 'Select Department'}
            </button>
        </div>
    );
}

export default EmployeeReports;

const groupBy=[
    {
        item_id:1,
        item_name:'Department'
    },
    {
        item_id:2,
        item_name:'Job Title'
    },
    {
        item_id:3,
        item_name:'Pay Grade'
    },
    {
        item_id:4,
        item_name:'Employment Status'
    }
]