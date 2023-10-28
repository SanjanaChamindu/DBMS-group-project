import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [dataFromBackend, setDataFromBackend] = useState({});
  // ! Start removing from here
  // Basic Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeIndex, setEmployeeIndex] = useState('');

  // Organization Structure
  const [company, setCompany] = useState('');
  const [jobTitle, setJobtitle] = useState('');

  // Work Details
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');

  // Contact Details
  const [address, setAddress] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const [customFields, setCustomFields] = useState([]);
  // ! Until here

  // Basic Details
  const [employee_id, setEmployeeID] = useState("");
  const [nic, setNIC] = useState("");
  const [full_name, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [supervisor_id, setSupervisorID] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const dataFromBackend = {
      // Removde these after changing the frontend
      firstName: "Johnatan",
      lastName: "Smith",
      employeeIndex: "12345",
      company: "Tech Co.",
      jobTitle: "Full Stack Developer",
      website: "https://example.com",
      twitter: "@example",
      github: "example",
      address: "Bay Area, San Francisco, CA",
      instagram: "example",
      facebook: "example",
      customFields: [
        { label: "Custom Field 1", value: "Value 1" },
        { label: "Custom Field 2", value: "Value 2" },
        // Add more custom fields as needed
      ],


      employee_id: " ",
      nic: " ",
      full_name: " ",
      gender: " ",
      supervisor_id: " ",
      job_title: " ",
      department: " ",
    };

    setEmployeeID(dataFromBackend.employee_id);
    setNIC(dataFromBackend.nic);
    setFullName(dataFromBackend.full_name);
    setGender(dataFromBackend.gender);
    setSupervisorID(dataFromBackend.supervisor_id);
    setJobTitle(dataFromBackend.job_title);
    setDepartment(dataFromBackend.department);

    // Remove these after changing the frontend
    setFirstName(dataFromBackend.firstName);
    setLastName(dataFromBackend.lastName);
    setEmployeeIndex(dataFromBackend.employeeIndex);
    setCompany(dataFromBackend.company);
    setJobtitle(dataFromBackend.jobTitle);
    setWebsite(dataFromBackend.website);
    setTwitter(dataFromBackend.twitter);
    setGithub(dataFromBackend.github);
    setAddress(dataFromBackend.address);
    setInstagram(dataFromBackend.instagram);
    setFacebook(dataFromBackend.facebook);
    setCustomFields(dataFromBackend.customFields);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const saveDataChanges = async (updatedData) => {
    try {
      // const res = await axios.put("/addnewemployeewhatever", updatedData); // Send a PUT request to update the data
      // console.log("New employee added successfully:", res);
    } catch (error) {
      console.error("Error adding new employee:", error);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const updatedData = {
        employee_id,
        nic,
        full_name,
        gender,
        supervisor_id,
        job_title,
        department,
    };
    console.log(updatedData);
    setDataFromBackend(updatedData);
    saveDataChanges(updatedData);
  };

  // Define the Profile component within the ProfilePage component
  const NewEmployee = () => {
    console.log("Profile");
    return <div className="profile"></div>;
  };

  return (
    <section
      style={{
        backgroundColor: "none",
        alignContent: "center",
        padding: "50px 0",
        display: "flex",
      }}
    >
      <div
        className="col-lg-8"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="card mb-4 ">
          <div
            className="card-body"
            style={{ zIndex: 1, alignContent: "center" }}
          >
            <h2
              className="mb-4"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              User Profile
            </h2>

            {/* Basic Details Section */}
            <div className="card mb-4" style={{ margin: "0 auto", zIndex: 1 }}>
              <div className="card-body" style={{ zIndex: 1 }}>
                <h3 className="card-title">Basic Details</h3>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">First Name:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    ) : (
                      <p>{firstName}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Last Name:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    ) : (
                      <p>{lastName}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Employee Index:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={employeeIndex}
                        onChange={(e) => setEmployeeIndex(e.target.value)}
                      />
                    ) : (
                      <p>{employeeIndex}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Structure Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Organization Structure</h3>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Company:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    ) : (
                      <p>{company}</p>
                    )}
                  </div>
                </div>
                <div className="row">
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
              </div>
            </div>

            {/* Work Details Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Work Details</h3>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Website:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    ) : (
                      <p>{website}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Twitter:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    ) : (
                      <p>{twitter}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">GitHub:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    ) : (
                      <p>{github}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Contact Details</h3>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Address:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      <p>{address}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Instagram:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    ) : (
                      <p>{instagram}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="font-weight-bold">Facebook:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    ) : (
                      <p>{facebook}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Fields Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Custom Fields</h3>
                {customFields.map((field, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-4">
                      <p className="font-weight-bold">{field.label}:</p>
                    </div>
                    <div className="col-md-8">
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={field.value}
                          onChange={(e) => {
                            const updatedFields = [...customFields];
                            updatedFields[index].value = e.target.value;
                            setCustomFields(updatedFields);
                          }}
                        />
                      ) : (
                        <p>{field.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right">
              {isEditing ? (
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render the Profile component within the ProfilePage component */}
      <NewEmployee />
    </section>
  );
}
