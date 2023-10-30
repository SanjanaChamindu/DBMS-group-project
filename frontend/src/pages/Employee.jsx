import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Profileview from './profileviewemp';
import axios from "axios";

const Employee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let employee, edit, page,storedItem, permission_level;
    
    if (location.state) {
        ({ employee, edit, page,storedItem, permission_level } = location.state);
    }

    // Define a state to store the employee
    console.log("inside",page);
    const [storedEmployee, setStoredEmployee] = useState(employee);
    const [editEmployee, setEditEmployee] = useState(edit);

    useEffect(() => {
        if (employee) {
            // If employee is passed in location state, update storedEmployee and editEmployee
            setStoredEmployee(employee);
            setEditEmployee(edit);
        }
    }, [employee, edit]);

    const handleClicked = () => {
        console.log("handleClicked",page);
        if (page===1) {
            navigate(`/dashboard/employee-details/view-all-employees`);}
        else if (page===2) {
            navigate(`/dashboard/employee-details/view-subordinates`);}
        else if (page===3) {
            let passingData=storedItem;
            navigate(`/dashboard/viewEmpReports`, { state: { passingData} });}
        else if (page===4) {
            let passingData=storedItem;
            navigate(`/dashboard/viewCustomReports`, { state: { passingData} });}
        else return;
        }

        //! /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isEditing, setIsEditing] = useState(edit);
  const [dataFromBackend, setDataFromBackend] = useState({});
  // const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/reports");
        // setPosts(res.data);
        console.log("posts", res);
        dataFromBackend["fullName"] = res.data.data[0].full_name;
        dataFromBackend["nic"] = res.data.data[0].nic;
        dataFromBackend["gender"] = res.data.data[0].gender;
        dataFromBackend["birthday"] = res.data.data[0].birth_day.slice(0, 10);
        dataFromBackend["maritalStatus"] = res.data.data[0].marital_status;
        dataFromBackend["employeeID"] = res.data.data[0].employee_id;
        dataFromBackend["userName"] = res.data.data[0].user_name;
        dataFromBackend["jobTitle"] = res.data.data[0].job_title_id;
        dataFromBackend["supervisorID"] = res.data.data[0].supervisor_id;
        dataFromBackend["department"] = res.data.data[0].department_id;
        dataFromBackend["employmentStatus"] =
          res.data.data[0].employment_status;
        dataFromBackend["personalAddress"] = res.data.data3[0].address;
        dataFromBackend["primaryPhoneNumber"] =
          res.data.data3[0].primary_phone_number;
        dataFromBackend["secondaryPhoneNumber"] =
          res.data.data3[0].secondary_phone_number;
        dataFromBackend["emailAddress"] = res.data.data3[0].email_address;
        dataFromBackend["emergencyContact1"] = {};
        dataFromBackend["emergencyContact1"]["phoneNumber"] =
          res.data.data3[0].primary_emergency_contact;
        dataFromBackend["emergencyContact2"] = {};
        dataFromBackend["emergencyContact2"]["phoneNumber"] =
          res.data.data3[0].secondary_emergency_contact;
        let addedCustomFields = [];
        res.data.data2.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            console.log(key, value);
            let templist = {};
            templist["label"] = key;
            templist["value"] = value;
            addedCustomFields.push(templist);
            console.log(addedCustomFields);
          }
        });
        dataFromBackend["addedCustomFields"] = addedCustomFields;
        setFullName(dataFromBackend.fullName);
        setNIC(dataFromBackend.nic);
        setGender(dataFromBackend.gender);
        setBirthday(dataFromBackend.birthday);
        setMaritalStatus(dataFromBackend.maritalStatus);
        setEmployeeID(dataFromBackend.employeeID);
        setUserName(dataFromBackend.userName);
        setJobTitle(dataFromBackend.jobTitle);
        setSupervisorID(dataFromBackend.supervisorID);
        setDepartment(dataFromBackend.department);
        setEmploymentStatus(dataFromBackend.employmentStatus);
        setPersonalAddress(dataFromBackend.personalAddress);
        setPrimaryPhoneNumber(dataFromBackend.primaryPhoneNumber);
        setSecondaryPhoneNumber(dataFromBackend.secondaryPhoneNumber);
        setEmailAddress(dataFromBackend.emailAddress);
        setEmergencyContact1(dataFromBackend.emergencyContact1);
        setEmergencyContact2(dataFromBackend.emergencyContact2);
        setAddedCustomFields(dataFromBackend.addedCustomFields);
        console.log(dataFromBackend);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Basic Details
  const [fullName, setFullName] = useState("");
  const [nic, setNIC] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [supervisorID, setSupervisorID] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");

  // Work Details
  const [personalAddress, setPersonalAddress] = useState("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("");
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emergencyContact1, setEmergencyContact1] = useState({
    //name: "",
    phoneNumber: "",
    //relation: "",
  });
  const [emergencyContact2, setEmergencyContact2] = useState({
    //name: "",
    phoneNumber: "",
    //relation: "",
  });

  // Custom Fields
  const [addedCustomFields, setAddedCustomFields] = useState([]);

  // Define profilePicture and handleProfilePictureChange
  const [profilePicture, setProfilePicture] = useState(
    "https://bodhicounseling.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-300x300.png"
  );

  // Iterate and render custom fields in the Basic Details section
  const renderCustomFields = () => {
    return addedCustomFields.map((field, index) => (
      <div key={index} className="row" style={{ marginBottom: "10px" }}>
        <div className="col-md-4">
          <p className="font-weight-bold">{field.label}:</p>
        </div>
        <div className="col-md-8">
          {isEditing ? (
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                value={field.value}
                onChange={(e) => {
                  const updatedFields = [...addedCustomFields];
                  updatedFields[index].value = e.target.value;
                  setAddedCustomFields(updatedFields);
                }}
              />
            </div>
          ) : (
            <p>{field.value}</p>
          )}
        </div>
      </div>
    ));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const saveDataChanges = async (updatedData) => {
    try {
      const res = await axios.put("/updateProfile", updatedData); // Send a PUT request to update the data
      console.log("Data updated successfully:", res);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSaveClick = () => {
    // Make API call to save changes to the database
    setIsEditing(false);
    const updatedData = {
      fullName,
      nic,
      gender,
      birthday,
      maritalStatus,
      employeeID,
      userName,
      jobTitle,
      supervisorID,
      department,
      employmentStatus,
      personalAddress,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      emailAddress,
      emergencyContact1,
      emergencyContact2,
      addedCustomFields
    };
    console.log(updatedData);
    setDataFromBackend(updatedData);
    saveDataChanges(updatedData);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


    return (
        <React.Fragment>
            <Button onClick={handleClicked} style={{ marginLeft: '20px', marginRight: '10px', marginTop: '10px' }}>Back</Button>
            {/* <div style={{ color: "#fff" }}>
                <Profileview isEditing={editEmployee} employee={storedEmployee}/>
            </div> */}

            <div
      className="row"
      style={{ marginLeft: "10px", marginRight: "10px", marginTop: "10px" }}
    >
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img
              src={profilePicture}
              alt="avatar"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }} // Set fixed width and height
            />
            <h5 className="mb-1">{fullName}</h5>
            <p className="mb-1">{jobTitle}</p>
            <p className="mb-1">Employee ID: {employeeID}</p>
            <div className="d-flex justify-content-center mb-2">
              <input
                type="file"
                accept="image/*"
                id="profile-picture-input"
                style={{ display: "none" }}
                onChange={handleProfilePictureChange}
              />
              <label
                htmlFor="profile-picture-input"
                className="btn btn-primary"
                style={{ cursor: "pointer" }}
              >
                Change Profile Picture
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-4">User Profile</h2>

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
                      />
                    ) : (
                      <p>{gender}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Birthday:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    ) : (
                      <p>{birthday}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Marital Status:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                      />
                    ) : (
                      <p>{maritalStatus}</p>
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
                      />
                    ) : (
                      <p>{employeeID}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
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
                      />
                    ) : (
                      <p>{userName}</p>
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
                      />
                    ) : (
                      <p>{department}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Employment Status:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                      />
                    ) : (
                      <p>{employmentStatus}</p>
                    )}
                  </div>
                </div>

                {/* Custom Fields Section */}
                {renderCustomFields()}
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title" style={{ marginBottom: "10px" }}>
                  Contact Details
                </h3>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Personal Address:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={personalAddress}
                        onChange={(e) => setPersonalAddress(e.target.value)}
                      />
                    ) : (
                      <p>{personalAddress}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Primary Phone Number:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={primaryPhoneNumber}
                        onChange={(e) => setPrimaryPhoneNumber(e.target.value)}
                      />
                    ) : (
                      <p>{primaryPhoneNumber}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Secondary Phone Number:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={secondaryPhoneNumber}
                        onChange={(e) =>
                          setSecondaryPhoneNumber(e.target.value)
                        }
                      />
                    ) : (
                      <p>{secondaryPhoneNumber}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Email Address:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    ) : (
                      <p>{emailAddress}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts Section */}
            <div className="card">
              <div className="card-body">
                <h3 className="card-title" style={{ marginBottom: "10px" }}>
                  Emergency Contacts
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <p className="font-weight-bold">Emergency Contact 1:</p>
                    {isEditing ? (
                      <div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Name:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={emergencyContact1.name}
                            onChange={(e) =>
                              setEmergencyContact1({
                                ...emergencyContact1,
                                name: e.target.value,
                              })
                            }
                          />
                        </div> */}
                        <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Phone Number:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={emergencyContact1.phoneNumber}
                            onChange={(e) =>
                              setEmergencyContact1({
                                ...emergencyContact1,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Relation:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Relation"
                            value={emergencyContact1.relation}
                            onChange={(e) =>
                              setEmergencyContact1({
                                ...emergencyContact1,
                                relation: e.target.value,
                              })
                            }
                          />
                        </div> */}
                      </div>
                    ) : (
                      <div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Name:</strong> {emergencyContact1.name}
                          </label>
                        </div> */}
                        <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Phone Number:</strong>{" "}
                            {emergencyContact1.phoneNumber}
                          </label>
                        </div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Relation:</strong>{" "}
                            {emergencyContact1.relation}
                          </label>
                        </div> */}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <p className="font-weight-bold">Emergency Contact 2:</p>
                    {isEditing ? (
                      <div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Name:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={emergencyContact2.name}
                            onChange={(e) =>
                              setEmergencyContact2({
                                ...emergencyContact2,
                                name: e.target.value,
                              })
                            }
                          />
                        </div> */}
                        <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Phone Number:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={emergencyContact2.phoneNumber}
                            onChange={(e) =>
                              setEmergencyContact2({
                                ...emergencyContact2,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Relation:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Relation"
                            value={emergencyContact2.relation}
                            onChange={(e) =>
                              setEmergencyContact2({
                                ...emergencyContact2,
                                relation: e.target.value,
                              })
                            }
                          />
                        </div> */}
                      </div>
                    ) : (
                      <div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Name:</strong> {emergencyContact2.name}
                          </label>
                        </div> */}
                        <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Phone Number:</strong>{" "}
                            {emergencyContact2.phoneNumber}
                          </label>
                        </div>
                        {/* <div
                          className="form-group"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <strong>Relation:</strong>{" "}
                            {emergencyContact2.relation}
                          </label>
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Details Button */}
          <div
            className="d-flex justify-content-left mb-2"
            style={{ marginLeft: "15px" }}
          >
            {permission_level===4 && (isEditing ? (
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
            ))}
          </div>
        </div>
      </div>
      console.log(posts.data[0].full_name);
    </div>

        </React.Fragment>
    );
}

export default Employee;