import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination.jsx';
import { getEmpLeaves } from '../services/leavesOfEmployee.js';
import { paginate } from '../utils/paginate.js';
import './css/allEmployees.css';
import axios from 'axios';

const Leaves = () => {
    const navigate = useNavigate(); // Initialize navigate function
    
    const [state, setState] = useState({
        // leaves: getEmpLeaves(),
        leaves : [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: 'status', order: 'desc' }
    }); 

    const curr_status = { 2: "Pending", 1: "Approved", 0: "Rejected" };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get("/leaves/requests/myrequests");
            const leaveData = res.data.map((element) => ({
                // {
                //     "leave_request_id": 2,
                //     "employee_id": "1820267651",
                //     "date": "2024-11-15T18:30:00.000Z",
                //     "description": "Another request",
                //     "supervisor_approval": 2,
                //     "leave_type": "Annual"
                // },
              request_id: element.leave_request_id,
              employee_id: element.employee_id,
              requested_date: element.date.slice(0,10),
              reason: element.description,
              leave_type : element.leave_type,
              status: curr_status[element.supervisor_approval]

            //   "leave_request_id": 2,
            //   "employee_id": "1820267651",
            //   "date": "2023-11-30T18:30:00.000Z",
            //   "description": "Personal Health Checkup",
            //   "supervisor_approval": null, 
            //   "leave_type": "Annual"
            }));
            console.log(leaveData);
            
            setState({
              ...state,
              leaves: leaveData,
            });
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

    const navigateTo = (leave) => {
        console.log(leave);
        navigate(`/dashboard/viewRequest`, { state: {leave,leaves_page:true} });
    };

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

    const renderNewLeaveButton = () => {
        return (
            <div className='pagination'>
            <Link to="/dashboard/leave/new">
                <Button>Request a new leave</Button>
            </Link>
            </div>
        );
    }

    const { length: count } = state.leaves;
    if (count === 0) return (
        <div>
            <p className='paragraph'>You have no past leaves</p>
            {renderNewLeaveButton()}
        </div>
    );

    const sorted = _.orderBy(state.leaves, [state.sortColumn.path], [state.sortColumn.order]);
    const leavesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Past Requests : {count}</p>

            <div className='table-container'>
                <div className='pagination'>
                    <Link to="/dashboard/leave/new">
                        <Button>Request a new leave</Button>
                    </Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("request_id")}>Leave ID {renderSortIcon("request_id")}</th>
                            <th className='clickable' onClick={() => handleSort("leave_type")}>Leave Type{renderSortIcon("leave_type")}</th>
                            <th className='clickable' onClick={() => handleSort("requested_date")}>Requested Date{renderSortIcon("requested_date")}</th>
                            <th className='clickable' onClick={() => handleSort("status")}>Status{renderSortIcon("status")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.request_id}>
                                <td onClick={() => navigateTo(leave)}>{leave.request_id}</td>
                                <td onClick={() => navigateTo(leave)}>{leave.leave_type}</td>
                                <td onClick={() => navigateTo(leave)}>{leave.requested_date}<span> </span></td>
                                <>{console.log("this is a leave" ,leave)}</>
                                <td onClick={() => navigateTo(leave)}>{leave.status}</td>
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