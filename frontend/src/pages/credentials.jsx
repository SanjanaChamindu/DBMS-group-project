import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(true);

  // Basic Details
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReNewPassword] = useState("");

  // Temporary array to store the data
  const [temporaryData, setTemporaryData] = useState({
    oldPassword: "",
    newPassword: "",
    reEnterPassword: "",
  });

  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        oldPassword: "",
        newPassword: "",
        reEnterPassword: "",
      };

      setOldPassword(dataFromBackend.oldPassword);
      setNewPassword(dataFromBackend.newPassword);
      setReNewPassword(dataFromBackend.reEnterPassword);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    setTemporaryData({
      oldPassword,
      newPassword,
      reEnterPassword,
    });
  };

  // Function to send data to the backend

  const handleDoneClick = () => {
      if (isEditing) {
          alert("Still editing");
      } else {
          // Check if all required fields are filled
          if (
              oldPassword.trim() === "" ||
              newPassword.trim() === "" ||
              reEnterPassword.trim() === ""
          ) {
              alert("Please fill all the fields.");
          } else if (newPassword !== reEnterPassword) {
              alert("Re-entered password is different. Enter again !!!");
          } else {
              const temporaryData = {
                  current_password: oldPassword.trim(),
                  new_password: newPassword.trim(),
              };
  
              // Make an API call to change the password using Axios
              axios.post('/auth/changepassword', temporaryData)
                  .then((response) => {
                      if (response.status === 200) {
                          alert("Password changed successfully!");
                      } else {
                          alert("Failed to change the password. Please try again.");
                      }
                  })
                  .catch((error) => {
                      console.error("Error: ", error);
                      alert("An error occurred. Please try again later.");
                  });
          }
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
                  Change Password
                </h3>

                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Old Password:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{oldPassword}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">New Password:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{newPassword}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Re Enter New Password:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
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
