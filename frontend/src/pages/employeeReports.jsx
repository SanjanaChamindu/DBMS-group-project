import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import { getDepts } from '../services/fakeDeptService';
import { getJobTitles } from '../services/jobTitles';
import axios from 'axios';

const EmployeeReports = () => {
    const navigate = useNavigate()
    const [department, setDepartment] = useState(null);
    const [job, setJob] = useState(null);

    const [selectedDept, setSelectedDept] = useState({depts : []});
    const [selectedJob, setSelectedJob] = useState({jobs : []});
    const [selectedGender, setSelectedGender] = useState(null);

    // const Job_titles=getJobTitles();
    // const depts =  getDepts();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/reports/depts");
                const deptData = res.data.map((element) => ({
                    dept_name: element.department_name,
                    dept_id: element.department_id,
                }));
                setSelectedDept({
                    ...selectedDept,
                    depts: deptData,
                })
                console.log(deptData.jobs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/reports/jobs");
                const jobData = res.data.map((element) => ({
                    job_title_id: element.job_title_id,
                    job_title_name: element.job_title_name,
                    paygrade_id: element.paygrade_id,
                }));
                console.log(jobData);
                setSelectedJob({
                    ...selectedJob,
                    jobs: jobData,
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleItemClickDept = (item) => {
        setDepartment(item);
    }

    const handleItemClickJob = (item) => {
        setJob(item);
    }

    const navigateTo = () => {
        if (!selectedDept || !selectedJob || !selectedGender) {
            Swal.fire({
                title: 'Select all options',
                text: `Select all options to generate the report`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Close'
            })
            console.log("No elements in selectedOptions");
            return;
        }

        let passingData={department, job, selectedGender};
        console.log("navigate called", department, job, selectedGender);
        navigate(`/dashboard/viewEmpReports`, { state: { passingData } });
    }

    return (
        <div className='reports'>
            <h1 className='paragraph'>Group Employee Reports</h1>
            <ul>
                <li>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {department ? department.dept_name : 'Select Department'}
                    </button>
                
                    <ul className="dropdown-menu">
                        {selectedDept.depts.map(item => (
                            <li key={item.dept_id}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleItemClickDept(item)}
                                >
                                    {item.dept_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {job ? job.job_title_name : 'Select Job Title'}
                    </button>
                
                    <ul className="dropdown-menu">
                        {selectedJob.jobs.map(item => (
                            <li key={item.job_title_id}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleItemClickJob(item)}
                                >
                                    {item.job_title_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>

                <li>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {selectedGender ? selectedGender.item_name : 'Select Gender'}
                    </button>
            
                    <ul className="dropdown-menu">
                        {Gender.map(item => (
                            <li key={item.item_id}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => setSelectedGender(item)}
                                >
                                    {item.item_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="btn btn-primary" type="button" onClick={navigateTo}>Generate</button>
            </div>
        </div>
    );
}

export default EmployeeReports;

const Gender=[
    {
        item_id:'M',
        item_name:'Male'
    },
    {
        item_id:'F',
        item_name:'Female'
    }
]