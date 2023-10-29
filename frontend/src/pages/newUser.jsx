import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(true);
  
  // Basic Details
  const [employeeID, setEmployeeID] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setNewPassword] = useState('');
  const [reEnterPassword, setReNewPassword] = useState('');



    // Temporary array to store the data
    const [temporaryData, setTemporaryData] = useState({
        employeeID: '',
        userName: '',
        password: '',
        reEnterPassword: '',
      });


  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        employeeID: '',
        userName: '',
        password: '',
        reEnterPassword: '',

      };

      setEmployeeID(dataFromBackend.employeeID);
      setUserName(dataFromBackend.userName);
      setNewPassword(dataFromBackend.password);
      setReNewPassword(dataFromBackend.reEnterPassword);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    setTemporaryData({
      userName,
      employeeID,
      password,
      reEnterPassword,

    });
  };


// Function to send data to the backend
const handleDoneClick = () => {
    if (isEditing) {
      alert('Still editing');
    } else {
      // Check if all required fields are filled
      if (
        userName.trim() === '' ||
        employeeID.trim() === '' ||
        password.trim() === '' ||
        reEnterPassword.trim() === ''
      ) {
        alert('Please fill all the fields.');
      } else if (password != reEnterPassword){

        alert('Re entered password is different. Enter again !!!');

      } else {
        // All required fields are filled, proceed with employee creation
        // Send temporaryData to the backend
        // Example API call:
        alert('Employee Created');
      }
    }
  };
  




  return (
<div>
          <div className="col-md-8 d-flex justify-content-end" style={{ marginTop: '10px' }}>
            <div className="card mb-4">
              <div className="card-body" style={{ width: '800px' }}>


                {/* Basic Details Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title" style={{ marginBottom: '10px' }}>Create New user</h3>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Employee ID:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{employeeID}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">User Name:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{userName}</p>
                        )}
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Password:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{password}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Re Enter Password:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="date"
                            className="form-control"
                            value={reEnterPassword}
                            onChange={(e) => setReNewPassword(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{reEnterPassword}</p>
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

  );
}