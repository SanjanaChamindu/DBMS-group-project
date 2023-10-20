import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Basic Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeIndex, setEmployeeIndex] = useState('');

  // Organization Structure
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  // Work Details
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');

  // Contact Details
  const [address, setAddress] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  // Custom Fields
  const [customFields, setCustomFields] = useState([]);

  // Define profilePicture and handleProfilePictureChange
  const [profilePicture, setProfilePicture] = useState(
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  );

  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        firstName: 'Johnatan',
        lastName: 'Smith',
        employeeIndex: '12345',
        company: 'Tech Co.',
        jobTitle: 'Full Stack Developer',
        website: 'https://example.com',
        twitter: '@example',
        github: 'example',
        address: 'Bay Area, San Francisco, CA',
        instagram: 'example',
        facebook: 'example',
        customFields: [
          { label: 'Custom Field 1', value: 'Value 1' },
          { label: 'Custom Field 2', value: 'Value 2' },
          // Add more custom fields as needed
        ],
        // profilePicture: 'URL_TO_YOUR_PROFILE_PICTURE',
      };

      setFirstName(dataFromBackend.firstName);
      setLastName(dataFromBackend.lastName);
      setEmployeeIndex(dataFromBackend.employeeIndex);
      setCompany(dataFromBackend.company);
      setJobTitle(dataFromBackend.jobTitle);
      setWebsite(dataFromBackend.website);
      setTwitter(dataFromBackend.twitter);
      setGithub(dataFromBackend.github);
      setAddress(dataFromBackend.address);
      setInstagram(dataFromBackend.instagram);
      setFacebook(dataFromBackend.facebook);
      setCustomFields(dataFromBackend.customFields);
      // You can also set the profilePicture URL here
      // setProfilePicture(dataFromBackend.profilePicture);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Implement code to save the updated details to your backend or state.
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

  // Define the Profile component within the ProfilePage component
  const Profile = () => {
    console.log('Profile');
    return (
      <div className='profile'>
      </div>
    );
  };

  return (
    <section style={{ backgroundColor: '#f5f5f5', padding: '50px 0', zIndex: 1 }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="cards-body text-center" style={{zIndex:1}} >
                <img
                  src={profilePicture}
                  alt="avatar"
                  className="rounded-circle mb-3"
                  style={{ width: '150px' }}
                />
                <h5 className="mb-1">{firstName} {lastName}</h5>
                <p className="mb-1">{jobTitle}</p>
                <p className="mb-1">Employee Index: {employeeIndex}</p>
                <div className="d-flex justify-content-center mb-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-picture-input"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                  />
                  <label
                    htmlFor="profile-picture-input"
                    className="btn btn-primary"
                    style={{ cursor: 'pointer' }}
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
        </div>
      </div>

      {/* Render the Profile component within the ProfilePage component */}
      <Profile />

    </section>
  );
}
