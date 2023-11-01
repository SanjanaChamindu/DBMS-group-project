import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(true);

  // Basic Details
  const [label, setLabel] = useState("");

  // Temporary array to store the data
  const [temporaryData, setTemporaryData] = useState({
    label: "",
  });

  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        label: "",
      };

      setLabel(dataFromBackend.label);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    setTemporaryData({
        label,
    });
  };

  // Function to send data to the backend

  const handleDoneClick = () => {
      if (isEditing) {
          alert("Still editing");
      } else {
          // Check if all required fields are filled
          if (
            label.trim() === "" 
          ) {
              alert("Please fill all the fields.");
          } else {
            alert("Attribute created");
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
                  Add Custom Attribute
                </h3>

                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Attribute Label:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{label}</p>
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
