import React, { useState } from 'react';
import DropdownMenu from '../components/common/dropdown';
import { getDepts } from '../services/fakeDeptService';
import { useEffect } from 'react';
import axios from 'axios';

const EmployeeByDept = () => {
    const [selectedDept, setSelectedDept] = useState(null); // Assuming you want to track the selected department
   
    const [state, setState] = useState({depts : []});//getDepts(); // Assuming getDepts returns an array of department items
    console.log(selectedDept);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/reports/depts");
                const deptData = res.data.map((element) => ({
                    dept_name: element.department_name,
                    dept_id: element.department_id,
                }));
                console.log(deptData);
                setState({
                    ...state,
                    depts: deptData,
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='reports'>
            <h1 className='paragraph'>List Employee By Department</h1>
            <div className='dropdown'>
                <DropdownMenu items={state.depts} path={`/dashboard/deptEmployees`} onSelect={setSelectedDept} />
            </div>
        </div>
    );
}

export default EmployeeByDept;