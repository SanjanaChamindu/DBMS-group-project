import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/common/pagination';
import { getLeaves } from '../services/fakeLeaveService';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';

const AbsenceFunc = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const [state, setState] = useState({
        leaves: getLeaves(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'leave_id', order: 'asc' }
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

    const editLeave = (leave) => {
        navigate(`/dashboard/leave`, { state: { leave} });
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.leaves;
    if (count === 0) return <p className='paragraph'>Add new leaves to manage them</p>;

    const sorted = _.orderBy(state.leaves, [state.sortColumn.path], [state.sortColumn.order]);
    const leavesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Total leaves : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("leave_id")}>leave ID {renderSortIcon("leave_id")}</th>
                            <th className='clickable' onClick={() => handleSort("leave_type")}>Leave Type {renderSortIcon("leave_type")}</th>
                            <th className='clickable' onClick={() => handleSort("taken")}>Leaves Taken {renderSortIcon("taken")}</th>
                            <th className='clickable' onClick={() => handleSort("remaining")}>Leaves Taken {renderSortIcon("remaining")}</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.leave_id}>
                                <td >{leave.leave_id}</td>
                                <td >{leave.leave_type}</td>
                                <td >{leave.taken}</td>
                                <td >{leave.remaining}</td>
                                <td>
                                    <Button variant="outline-primary" style={{ width: '70px' }} onClick={() => editLeave(leave,true)}>Edit</Button>{' '}
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

export default AbsenceFunc;