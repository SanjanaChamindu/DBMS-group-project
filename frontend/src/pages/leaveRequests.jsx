import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getRequests } from '../services/fakeLeaveRequestService';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';

const LeaveRequests = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const [state, setState] = useState({
        leaves: getRequests(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'request_id', order: 'desc' }
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

    const viewRequest = (leave) => {
        navigate(`/dashboard/viewRequest`, { state: { leave} });
    };

    const approve = (leave) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to approve this leave?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'No',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call backend to approve leave
                Swal.fire('Approved!', 'The leave has been approved.', 'success');
            }
        }
        );
    };

    const decline = (leave) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to decline this leave?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'No',
            confirmButtonText: 'Yes, decline it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call backend to decline leave
                Swal.fire('Declined!', 'The leave has been declined.', 'success');
            }
        }
        );
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
                            <th className='clickable' onClick={() => handleSort("request_id")}>Request ID {renderSortIcon("request_id")}</th>
                            <th className='clickable' onClick={() => handleSort("basic_salary")}>Requester {renderSortIcon("basic_salary")}</th>
                            <th className='clickable' onClick={() => handleSort("ot_benificts")}>OT Benefits {renderSortIcon("ot_benificts")}</th>
                            <th className='clickable' onClick={() => handleSort("number_of_annual_leaves")}>Annual Leaves {renderSortIcon("number_of_annual_leaves")}</th>
                            <th />
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.request_id}>
                                <td onClick={() => viewRequest(leave)}>{leave.request_id}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.basic_salary}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.ot_benificts}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.number_of_annual_leaves}</td>
                                <td>
                                <Button
                                    variant="success" 
                                    style={{ 
                                        width: '120px', 
                                        fontWeight: 'bold', 
                                        fontSize: '16px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }} 
                                    onClick={() => approve(leave)}
                                    >
                                    <FcApproval style={{ marginRight: '5px' }} />
                                    Approve
                                    </Button>{' '}
                                </td>
                                <td>
                                    <Button 
                                        variant="danger" 
                                        style={{ 
                                            width: '120px', 
                                            fontWeight: 'bold', 
                                            fontSize: '16px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center' 
                                        }} 
                                        onClick={() => decline(leave)}
                                        >
                                        <FcDisapprove style={{ marginRight: '5px' }} />
                                        Decline
                                    </Button>{' '}
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

export default LeaveRequests;