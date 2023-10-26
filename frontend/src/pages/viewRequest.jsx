import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const ViewRequest = () => {
    const location = useLocation();
    let leave,leaves_page = false;
    
    if (location.state) {
        ({ leave,leaves_page} = location.state);
    }

    // Define a state to store the leave
    const [storedLeave, setStoredLeave] = useState(leave);

    useEffect(() => {
        if (leave) {
            // If leave is passed in location state, update setStoredLeave
            setStoredLeave(leave);
        }
    }, [leave]);

    const path = leaves_page ? "/dashboard/leaves" : "/dashboard/leave-requests";
    return (
        <React.Fragment>
 <div className="col-lg-6">
 <div className="card mb-4" style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'rgba(0, 0, 0, 0.3)', border: '2px solid white'  }}>
 <div className="card-body" style={{ color: 'white', fontWeight: 'bold' }}>
        <h3 className="card-title" style={{ marginBottom: '30px' }}>Request Details</h3>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Employee ID:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.employee_id}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Request ID:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.request_id}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Leave Type:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.leave_type}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
        <div className="col-md-4">
            <p className="font-weight-bold">Request Date:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.requested_date}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
  <div className="col-md-4">
    <p className="font-weight-bold">Leave Date(s):</p>
  </div>
  <div className="col-md-8">
    <ul>
      {storedLeave.dates.map((date, index) => (
        <li key={index}>{date}</li>
      ))}
    </ul>
  </div>
</div>
<div className="row" style={{ marginBottom: '10px' }}>
        <div className="col-md-4">
            <p className="font-weight-bold">Reason:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.reason}</p>
          </div>
        </div>
        
        <div className="row" style={{ marginBottom: '10px' }}>
        <div className="col-md-4">
            <p className="font-weight-bold">Status:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.status}</p>
          </div>
        </div>
        </div> 
    </div>
    </div>
    <Link to={path}>
                <Button style={{ marginLeft: '10px'}}>Back</Button>
            </Link>
        </React.Fragment>
    )
}

export default ViewRequest;