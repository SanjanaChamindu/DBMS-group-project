import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination.jsx';
import { getEmpLeaves } from '../services/leavesOfEmployee.js';
import { paginate } from '../utils/paginate.js';
import './css/allEmployees.css';

const Leaves = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const [state, setState] = useState({
        leaves: getEmpLeaves(),
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'leave_type_id', order: 'asc' }
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

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.leaves;
    if (count === 0) return <p className='paragraph'>You have got 0 leaves</p>;

    const sorted = _.orderBy(state.leaves, [state.sortColumn.path], [state.sortColumn.order]);
    const leavesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Past Leaves : {count}</p>

            <div className='table-container'>
                <div className='pagination'>
                    <Link to="/dashboard/leave/new">
                        <Button>Request a new leave</Button>
                    </Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("leave_type_id")}>Leave ID {renderSortIcon("leave_type_id")}</th>
                            <th className='clickable' onClick={() => handleSort("leave_type")}>Leave Type{renderSortIcon("leave_type")}</th>
                            <th className='clickable' onClick={() => handleSort("dates")}>Dates{renderSortIcon("dates")}</th>
                            <th className='clickable' onClick={() => handleSort("status")}>Status {renderSortIcon("status")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.leave_type_id}>
                                <td >{leave.leave_type_id}</td>
                                <td >{leave.leave_type}</td>
                                <td >{leave.dates}</td>
                                <td >{leave.status}</td>
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

export default Leaves