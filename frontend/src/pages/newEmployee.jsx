import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(true);

  //const [pageNumber, setPageNumber] = useState(1);
  // Basic Details
  const [fullName, setFullName] = useState("");
  const [nic, setNIC] = useState("");
  const [gender, setGender] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [supervisorID, setSupervisorID] = useState("");
  const [department, setDepartment] = useState("");
  //const [password, setPassword] = useState('');

  // Temporary array to store the data
  const [temporaryData, setTemporaryData] = useState({
    fullName: "",
    nic: "",
    gender: "",
    employeeID: "",
    jobTitle: "",
    supervisorID: "",
    department: "",
  });

  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        fullName: "",
        nic: "",
        gender: "",
        employeeID: "",
        jobTitle: "",
        supervisorID: "",
        department: "",
      };

      setFullName(dataFromBackend.fullName);
      setNIC(dataFromBackend.nic);
      setGender(dataFromBackend.gender);
      setEmployeeID(dataFromBackend.employeeID);
      setJobTitle(dataFromBackend.jobTitle);
      setSupervisorID(dataFromBackend.supervisorID);
      setDepartment(dataFromBackend.department);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    setTemporaryData({
      fullName,
      nic,
      gender,
      employeeID,
      jobTitle,
      supervisorID,
      department,
    });
    //   {
    //     "employee_id" : "1820212249",
    //     "nic" : "111111111111",
    //     "full_name" : "Chamath Hirushan",
    //     "supervisor_id" : "1820244756",
    //     "job_title_id" : "5535500303",
    //     "department_id" : "2505000005"
    // }
    try {
      // console.log("UPDATED DATAT", updatedData);
      // axios.post('/users', updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to send data to the backend
  const handleDoneClick = () => {
    if (isEditing) {
      alert("Still editing");
    } else {
      let updatedData = {
        full_name: fullName,
        nic: nic,
        employee_id: employeeID,
        job_title_id: jobTitle,
        supervisor_id: supervisorID,
        department_id: department,
      };
      // Check if all required fields are filled
      // if (
      //   fullName.trim() === '' ||
      //   nic.trim() === '' ||
      //   gender.trim() === '' ||
      //   employeeID.trim() === '' ||
      //   jobTitle.trim() === '' ||
      //   supervisorID.trim() === '' ||
      //   department.trim() === ''
      // ) {
      // alert('Please fill all the fields.');
      // } else {
      // All required fields are filled, proceed with employee creation
      // Send temporaryData to the backend
      // Example API call:
      console.log("In save", updatedData);
      try {
        const res = axios.post("/users/registeremp", updatedData);
        console.log(updatedData);
      } catch (err) {
        console.error(err);
      }
      // alert('Employee created');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div
        className="col-md-12 d-flex justify-content-center"
        style={{ marginLeft: "10px", marginTop: "10px", maxWidth: "800px" }}
      >
        <div className="card mb-4">
          <div className="card-body" style={{ width: "600px" }}>
            {/* Basic Details Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title" style={{ marginBottom: "10px" }}>
                  Basic Details
                </h3>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Full Name:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{fullName}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">NIC:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={nic}
                        onChange={(e) => setNIC(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{nic}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Gender:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{gender}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
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
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Job Title:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{jobTitle}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Supervisor ID:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={supervisorID}
                        onChange={(e) => setSupervisorID(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{supervisorID}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Department:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{department}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Details Button */}
          <div
            className="row"
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "15px",
            }}
          >
            <div className="col-6 d-flex justify-content-start">
              {isEditing ? (
                <button
                  className="btn btn-primary"
                  style={{ width: "150px", height: "40px" }}
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ width: "150px", height: "40px" }}
                  onClick={handleEditClick}
                >
                  Edit Details
                </button>
              )}
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                style={{ width: "150px", height: "40px" }}
                onClick={handleDoneClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
