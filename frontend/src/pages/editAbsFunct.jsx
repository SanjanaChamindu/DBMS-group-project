import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const EditAbsFunc = () => {
    const location = useLocation();
    let leave;

    if (location.state) {
        ({leave} = location.state);
    }

    // Define a state to store the leave
    const [storedLeave, setStoredLeave] = useState(leave);

    useEffect(() => {
        if (leave) {
            // If leave is passed in location state, upnumber setStoredLeave
            setStoredLeave(leave);
        }
    }, [leave]);
    console.log(leave);
    console.log(leave.number_of_annual_leaves)

    //////////////////////////////////////////////////////////////////////////////////////
    const [isEditing, setIsEditing] = useState(true);
  
    // Basic Details
    const [paygrade, setPaygrade] = useState(leave.leave_type_name);
    const [basicSalary, setBasicSalary] = useState(leave.basic_salary);
    const [otBenefits, setOtBenefits] = useState(leave.ot_benificts);
    const [annualLeaves, setAnnualLeaves] = useState(leave.number_of_annual_leaves);
    const [casualLeaves, setCasualLeaves] = useState(leave.number_of_casual_leaves);
    const [maternityLeaves, setMaternityLeaves] = useState(leave.number_of_maternity_leaves);
    const [no_payLeaves, setNoPayLeaves] = useState(leave.number_of_no_pay_leaves);
  
  
      // Temporary array to store the data
      const [temporaryData, setTemporaryData] = useState({
          paygrade: '',
          basicSalary: '',
          otBenefits: '',
          annualLeaves: '',
          casualLeaves: '',
          maternityLeaves: '',
          no_payLeaves: ''
        });
  
  
    useEffect(() => {
      // Simulate an asynchronous API call with setTimeout
      setTimeout(() => {
        const dataFromBackend = {
          paygrade: leave.leave_type_name,
          basicSalary: leave.basic_salary,
          otBenefits: leave.ot_benificts,
          annualLeaves: leave.number_of_annual_leaves,
          casualLeaves: leave.number_of_casual_leaves,
          maternityLeaves: leave.number_of_maternity_leaves,
          no_payLeaves: leave.number_of_no_pay_leaves
        };
        setPaygrade(dataFromBackend.paygrade)
        setBasicSalary(dataFromBackend.basicSalary)
        setOtBenefits(dataFromBackend.otBenefits)
        setAnnualLeaves(dataFromBackend.annualLeaves)
        setCasualLeaves(dataFromBackend.casualLeaves)
        setMaternityLeaves(dataFromBackend.no_payLeaves)
        setNoPayLeaves(dataFromBackend.no_payLeaves)
      }); // Simulate a 1-second delay for the API call
    }, []);
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = () => {
      setIsEditing(false);
  
      setTemporaryData({
        paygrade,
        basicSalary,
        otBenefits,
        annualLeaves,
        casualLeaves,
        maternityLeaves,
        no_payLeaves
      });
    };
  
  
  // Function to send data to the backend
  const handleDoneClick = () => {
      if (isEditing) {
        alert('Still editing');
      } else {
        // Check if all required fields are filled
        if (
          paygrade.trim() === '' ||
          basicSalary.trim() === '' ||
          otBenefits.trim() === '' ||
          annualLeaves.trim() === '' ||
          casualLeaves.trim() === '' ||
          maternityLeaves.trim() === '' ||
          no_payLeaves.trim() === ''
        ) {
          alert('Please fill all the fields.');
        }  else {
          // All required fields are filled, proceed with password change
          // Send temporaryData to the backend
          // Example API call:
          alert('Absence Functions Changed');
        }
      }
    };

    return (
        <React.Fragment>
            <Link to="/dashboard/abs-func">
                <Button style={{ marginLeft: '20px', marginRight: '10px', marginTop: '20px'}}>Back</Button>
            </Link>

            <div>
          <div className="col-md-12 d-flex justify-content-center" style={{ marginTop: '10px' }}>
            <div className="card mb-4">
              <div className="card-body" style={{ width: '800px' }}>


                {/* Basic Details Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title" style={{ marginBottom: '10px' }}>Editing Paygrade ID : {storedLeave.paygrade_id}</h3>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Paygrade:</p>
                      </div>
                      <div className="col-md-12">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={paygrade}
                            onChange={(e) => setPaygrade(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{paygrade}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Basic Salary:</p>
                      </div>
                      <div className="col-md-12">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={basicSalary}
                            onChange={(e) => setBasicSalary(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{basicSalary}</p>
                        )}
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">OT Benefits:</p>
                      </div>
                      <div className="col-md-12">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={otBenefits}
                            onChange={(e) => setOtBenefits(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{otBenefits}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Annual Leaves:</p>
                      </div>
                      <div className="col-md-12">
                        {isEditing ? (
                          <input
                            type="number"
                            className="form-control"
                            value={annualLeaves}
                            onChange={(e) => setAnnualLeaves(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{annualLeaves}</p>
                        )}
                      </div>
                    </div> 
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Casual Leaves:</p>
                      </div>
                      <div className="col-md-12">
                        {isEditing ? (
                          <input
                            type="number"
                            className="form-control"
                            value={casualLeaves}
                            onChange={(e) => setCasualLeaves(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{casualLeaves}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Maternity Leaves:</p>
                      </div>
                      <div className="col-md-12">
                        {isEditing ? (
                          <input
                            type="number"
                            className="form-control"
                            value={maternityLeaves}
                            onChange={(e) => setMaternityLeaves(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{maternityLeaves}</p>
                        )}
                      </div>
                    </div>  
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">No_Pay Leaves:</p>
                      </div>
                      <div className="col-md-12">
                        {false ? (
                          <input
                            type="number"
                            className="form-control"
                            value={no_payLeaves}
                            required
                          />
                        ) : (
                          <p>{no_payLeaves}</p>
                        )}
                      </div>
                    </div>                
                </div>
              </div>
            </div>

        {/* Edit Details Button */}
        <div className="row" style={{ marginLeft: '15px', marginRight: '15px', marginBottom: '15px' }}>
  <div className="col-6 d-flex justify-content-start">
    {isEditing ? (
      <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleSaveClick}>
        Save
      </button>
    ) : (
      <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleEditClick}>
        Edit Details
      </button>
    )}
  </div>
  <div className="col-6 d-flex justify-content-end">
    <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleDoneClick}>
      Done
    </button>
  </div>
</div>


</div>
</div>

</div>
        </React.Fragment>
    );
}

export default EditAbsFunc;