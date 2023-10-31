import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/common/pagination';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';


const CustomAttributes = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [selectedOption, setSelectedOption] = useState(null);

    const showTable = (option) => {
        console.log(option);
        //call the backend to change the data of the table
        return <TableCustom selectedOption={option}/>;
    }

    return (
        <div className='table-container'>

            <li>
                <div className='pagination'>
                    <Link to="/dashboard/custom-attribute/new">
                        <Button style={{margineBelow:40}}>New Custom Attribute</Button>
                    </Link>
                </div>
                    {!selectedOption && <h1 className='paragraph' style={{marginBlock:50}}>Select the custom attribute below, to view the employee details</h1>}
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style={{marginLeft:100}}>
                        {selectedOption ? selectedOption : 'Select Custom Attribute'}
                    </button>
                <ul className="dropdown-menu">
                    {DropdownOptions.map(item => (
                        <li key={item.id}>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedOption(item.option);
                                    showTable(item.option);}}
                            >
                                {item.option}
                            </a>
                        </li>
                    ))}
                </ul>

                {selectedOption && showTable(selectedOption)}
            </li>
    </div>
    )
}

export default CustomAttributes;

const TableCustom = (props) => {
    const selectedOption=props.selectedOption;

    const [state, setState] = useState({
        employees: Employees,
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: 'employee_id', order: 'asc' }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/users/allemp");
                console.log(res.data)
                const employees = res.data.map((element) => ({
                    employee_id: element.employee_id,
                    employee_name: element.full_name,
                    job_title: element.job_title_name,
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
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Employee ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_name")}>Name {renderSortIcon("employee_name")}</th>
                            <th className='clickable' onClick={() => handleSort("custom_attribute")}>{selectedOption}{renderSortIcon("custom_attribute")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                            <tr key={employee.employee_id}>
                                <td>{employee.employee_id}</td>
                                <td>{employee.employee_name}</td>
                                <td>{employee.custom_attribute}</td>
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