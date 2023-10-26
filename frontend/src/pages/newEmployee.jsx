import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(true);

  // Basic Details
  const [fullName, setFullName] = useState('');
  const [nic, setNIC] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [userName, setUserName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [supervisorID, setSupervisorID] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [nationality, setNationality] = useState('');

  // Work Details
  const [personalAddress, setPersonalAddress] = useState('');
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState('');
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emergencyContact1, setEmergencyContact1] = useState({ name: '', phoneNumber: '', relation: '' });
  const [emergencyContact2, setEmergencyContact2] = useState({ name: '', phoneNumber: '', relation: '' });

  // Define profilePicture and handleProfilePictureChange
  const [profilePicture, setProfilePicture] = useState(
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  );

  // Custom Fields
  const [addedCustomFields, setAddedCustomFields] = useState([]);



  // Iterate and render custom fields in the Basic Details section
    const renderCustomFields = () => {
      return addedCustomFields.map((field, index) => (
        <div key={index} className="row" style={{ marginBottom: '10px' }}>
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

  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        fullName: '',
        nic: '',
        gender: '',
        birthday: '',
        maritalStatus: '',
        employeeID: '',
        userName: '',
        jobTitle: '',
        supervisorID: '',
        department: '',
        employmentStatus: '',
        nationality: '',
        personalAddress: '',
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        emailAddress: '',
        emergencyContact1: { name: '', phoneNumber: '', relation: '' },
        emergencyContact2: { name: '', phoneNumber: '', relation: '' },
        addedCustomFields: [
          { label: 'Custom Field 1', value: '' },
          { label: 'Custom Field 2', value: '' },
          // Add more custom fields as needed
        ],
        // profilePicture: 'URL_TO_YOUR_PROFILE_PICTURE',
      };

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
      setNationality(dataFromBackend.nationality);
      setPersonalAddress(dataFromBackend.personalAddress);
      setPrimaryPhoneNumber(dataFromBackend.primaryPhoneNumber);
      setSecondaryPhoneNumber(dataFromBackend.secondaryPhoneNumber);
      setEmailAddress(dataFromBackend.emailAddress);
      setEmergencyContact1(dataFromBackend.emergencyContact1);
      setEmergencyContact2(dataFromBackend.emergencyContact2);
      setAddedCustomFields(dataFromBackend.addedCustomFields);
      // You can also set the profilePicture URL here
      // setProfilePicture(dataFromBackend.profilePicture);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

  };

  const handleNextClick = () => {
    if (isEditing) {
      // If isEditing is true, display a message
      alert('Still editing');
    } else {
      // If isEditing is false, proceed to the link
      window.location.href = '/dashboard/employee-details/view-all-employees';
    }
  };




  return (


          <div className="col-md-8 d-flex justify-content-end" style={{ marginTop: '10px' }}>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="mb-4">New Employee Details Page 1</h2>

                {/* Basic Details Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title" style={{ marginBottom: '10px' }}>Basic Details</h3>
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Birthday:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="date"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                          />
                        ) : (
                          <p>{birthday}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                          />
                        ) : (
                          <p>{userName}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
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
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Nationality:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                          />
                        ) : (
                          <p>{nationality}</p>
                        )}
                      </div>
                    </div>

                {/* Custom Fields Section */}
                {renderCustomFields()}
                
              </div>
            </div>
            </div>

        {/* Edit Details Button */}
        <div className="row">
  <div className="col-lg-6">
    <div className="d-flex justify-content-left mb-2" style={{ marginLeft: '15px' }}>
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
  </div>
  <div className="col-lg-6 d-flex justify-content-end">
    <button className="btn btn-primary" style={{ width: '150px', height: '40px', marginRight: '15px' }} onClick={handleNextClick}>Next</button>
  </div>
</div>


</div>
</div>

  );
}