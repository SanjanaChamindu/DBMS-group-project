import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BiSolidEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getEmployees } from '../services/fakeEmployeeService';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';

const AllEmployees = (props) => {
    const navigate = useNavigate(); // Initialize navigate function
    const permission_level=props.permission_level;

    const [state, setState] = useState({
        employees: getEmployees(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'employee_id', order: 'asc' }
    });

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
    const page=1;
    const viewEmployee = (employee, edit) => {
        navigate(`/dashboard/Employee`, { state: { employee, edit, page } });
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.employees;
    if (count === 0) return <p className='paragraph'>Add new employees to manage them</p>;

    const sorted = _.orderBy(state.employees, [state.sortColumn.path], [state.sortColumn.order]);
    const employeesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Total employees : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Employee ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_name")}>Name {renderSortIcon("employee_name")}</th>
                            <th className='clickable' onClick={() => handleSort("job_title")}>Job Title {renderSortIcon("job_title")}</th>
                            {permission_level >=3 && <th/>}
                            {permission_level >=3 && <th/>}
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                            <tr key={employee.employee_id}>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_id}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_name}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.job_title}</td>
                                {permission_level >=3 && <td>
                                    <Button variant="outline-primary" style={{ width: '70px' }} onClick={() => viewEmployee(employee,true)}><BiSolidEdit/></Button>{' '}
                                </td>}
                                {permission_level >=3 && <td>
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

export default AllEmployees;