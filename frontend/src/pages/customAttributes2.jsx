import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/common/pagination';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';
import Input from '../components/common/input';


const CustomAttributes= () => {
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <div className='table-container'>

            <li>
                <div className='pagination'>
                    <Link to="/dashboard/custom-attribute/new">
                        <Button style={{margineBelow:40}}>New Custom Attribute</Button>
                    </Link>
                </div>

                <TableCustom/>
            </li>
    </div>
    )
}

export default CustomAttribute;

const TableCustom = () => {

    const [state, setState] = useState({
        attributes: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: 'attribute', order: 'asc' }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/users/allemp");
                console.log(res.data)
                const employees = res.data.map((element) => ({
                    employee_id: element.employee_id
                    // employee_id: element.employee_id,
                    // employee_name: element.Full_name,
                    // job_title: element.job_title_id,
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
            <p className='paragraph'>Showing total of {count} employees with attribute {selectedOption} </p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Attribute {renderSortIcon("employee_id")}</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                            <tr key={employee.employee_id}>
                                <td>{employee.employee_id}</td>
                                <td>
                                    <Button variant="outline-danger" style={{ width: '70px' }} onClick={() => d(employee)}><RiDeleteBin6Line/></Button>{' '}
                                </td>
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

const Employees = [ //changing with the options of the dropdown
    {
        employee_id: 1,
        employee_name: 'John Doe',
        custom_attribute: 'Jsl'
    },
    {
        employee_id: 2,
        employee_name: 'Jane Doe',
        custom_attribute: 'Jslw'
    },
    {
        employee_id: 3,
        employee_name: 'John Doe',
        custom_attribute: 'Jsl'
    },
    {
        employee_id: 4,
        employee_name: 'John Doe',
        custom_attribute: 'Jsl'
    },
    {
        employee_id: 5,
        employee_name: 'Jane Doe',
        custom_attribute: 'Jslw'
    },
    {
        employee_id: 6,
        employee_name: 'John Doe',
        custom_attribute: 'Jsl'
    }]

const DropdownOptions = [
    {
        id: 1,
        option: 'atribute1'
    },
    {
        id: 2,
        option: 'atribute2'
    },
    {
        id: 3,
        option: 'atribute3'
    },
    {
        id: 4,
        option: 'atribute4'
    },
    {
        id: 5,
        option: 'atribute5'
    },
    {
        id: 6,
        option: 'atribute6'
    }]