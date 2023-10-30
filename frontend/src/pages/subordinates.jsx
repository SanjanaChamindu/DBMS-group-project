import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BiSolidEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getSubordinates } from '../services/fakeSubordinateService';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';
import axios from 'axios';

const Subordinates = (props) => {
    const navigate = useNavigate(); // Initialize navigate function
    const permission_level=props.permission_level;    
    

    const [state, setState] = useState({
        employees: [],
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'employee_id', order: 'asc' }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/reports/subordinates");
                console.log(res.data)
                const employees = res.data.map((element) => ({
                    employee_id: element.employee_id,
                    employee_name: element.Full_name,
                    job_title: element.job_title_id,
                }));
                setState({ ...state, employees,});
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    const handlePageChange = (page) => {
        setState({ ...state, currentPage: page });
    }

    const handleSort = (path) => {
        const sortColumn = { ...state.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        setState({ ...state, sortColumn });
    }

    const page=2;
    const viewEmployee = (employee, edit) => {
        navigate(`/dashboard/Employee`, { state: { employee, edit, page, permission_level:4 } });
    };

    const deleteEmployee = (employee) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${employee.employee_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call backend to delete employee
                const employees = state.employees.filter(e => e.employee_id !== employee.employee_id);
                setState({ ...state, employees });
                Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
            }
        });
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.employees;
    if (count === 0) return <p className='paragraph'>Add new subordinates to manage them</p>;

    const sorted = _.orderBy(state.employees, [state.sortColumn.path], [state.sortColumn.order]);
    const employeesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Total subordinates : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Employee ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_name")}>Name {renderSortIcon("employee_name")}</th>
                            <th className='clickable' onClick={() => handleSort("job_title")}>Job Title {renderSortIcon("job_title")}</th>
                            <th />
                            {permission_level >= 4 && <th/>}
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                            <tr key={employee.employee_id}>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_id}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_name}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.job_title}</td>
                                <td>
                                    <Button variant="outline-primary" style={{ width: '70px' }} onClick={() => viewEmployee(employee,true)}><BiSolidEdit/></Button>{' '}
                                </td>
                                {permission_level >= 4 && <td>
                                    <Button variant="outline-danger" style={{ width: '70px' }} onClick={() => deleteEmployee(employee)}><RiDeleteBin6Line/></Button>{' '}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination className='pagination'
                itemsCount={count}
                pageChange={handlePageChange}
                pageSize={state.pageSize}
                currentPage={state.currentPage}
            />
        </React.Fragment>
    );
}

export default Subordinates;