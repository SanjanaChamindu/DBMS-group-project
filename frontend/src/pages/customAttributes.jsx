import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../node_modules/sweetalert2/dist/sweetalert2.js";
import Pagination from "../components/common/pagination";
import { getEmployees } from "../services/fakeEmployeeService";
import { paginate } from "../utils/paginate";
import "./css/allEmployees.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "../components/common/input";

const CustomAttributes = () => {
  const [state, setState] = useState({
    attributes: [],
    pageSize: 14,
    currentPage: 1,
    sortColumn: { path: "attribute", order: "asc" },
    data: {},
  });

  // state.attributes = [
  //   { attribute: "nationality" },
  //   { attribute: "religion" },
  //   { attribute: "uiwyw" },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/custom/customFeilds");
        console.log(res.data);
        const newAttributes = res.data.map((element) => ({
          attribute: element.attribute_name,
        }));

        // Create a new state object based on the old state and update the 'attributes' field
        const newState = { ...state, attributes: newAttributes };

        setState(newState);
        console.log("current State", newState);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("/custom/customFeilds");
  //       console.log(res.data)
  //       const attributes = res.data.map((element) => ({
  //         attribute: element.full_name
  //       }));
  //       setState({ ...state, attributes,});
  //       console.log("current State", state)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [])

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const res = await axios.get("/users/allemp");
  //             console.log(res.data)
  //             const attributes = res.data.map((element) => ({
  //                 employee_name: element.full_name
  //             }));
  //             setState({ ...state, attributes,});
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     };
  //     fetchData();
  // }, [])

  const handlePageChange = (page) => {
    setState({ ...state, currentPage: page });
  };

  const handleSort = (path) => {
    const sortColumn = { ...state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    setState({ ...state, sortColumn });
  };

  const deleteEmployee = (employee) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${employee.attribute}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //call backend to delete employee
        console.log(employee);
        const temp = {};
        temp["attribute_name"] = state.data["New Attribute"];
        console.log("Temp is ", temp);
        try {
          console.log("Trying");
          const q = "/custom/customfield/delete/" + employee.attribute;
          console.log(q);
          const res = axios.delete(q);
          Swal.fire("Deleted!", "This attribute has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
        console.log(state.data);
        const attributes = state.attributes.filter(
          (e) => e.attribute !== employee.attribute
        );
        setState({ ...state, attributes });
      }
    });
  };

  const addAttribute = () => {
    // console.log("THIS IS THE VALUE", state.data);
    // console.log("thsi", state.data["New Attribute"])
    const temp = {};
    const temp2 = {};
    temp["attribute_name"] = state.data["New Attribute"];
    temp2["attribute"] = state.data["New Attribute"];
    console.log("Temp is ", temp);
    try {
      console.log("Trying");
      const res = axios.post(`/custom/customfield/add`, temp);
      const newAttributes=[...state.attributes,temp2]
      setState({ ...state, attributes: newAttributes });
      console.log("newAttributes",newAttributes);
      // alert("New attribute added");
    } catch (error) {
      console.log(error);
    }
    console.log(state.data);
    ///////
  };

  const renderSortIcon = (column) => {
    if (column !== state.sortColumn.path) return null;
    if (state.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  const { length: count } = state.attributes;
  if (count === 0)
    return <p className="paragraph">Add new employees to manage them</p>;

  const sorted = _.orderBy(
    state.attributes,
    [state.sortColumn.path],
    [state.sortColumn.order]
  );
  const employeesInPage = paginate(sorted, state.currentPage, state.pageSize);

  return (
    <React.Fragment>
      <div className="pagination">
        <Input
          name="New Attribute"
          label="New Attribute"
          style={{ width: "350px", margineRight: "40px" }}
          onChange={(e) =>
            setState({
              ...state,
              data: { ...state.data, [e.target.name]: e.target.value },
            })
          }
        />
        <Link to="/dashboard/custom-attributes">
          <Button
            onClick={() => addAttribute()}
            style={{ margineBelow: 40, marginLeft: 20 }}
          >
            Add
          </Button>
        </Link>
      </div>

      <p className="paragraph">Total Custom Attributes : {count}</p>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="clickable" onClick={() => handleSort("attribute")}>
                Custom Attribute {renderSortIcon("attribute")}
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {employeesInPage.map((employee) => (
              <tr key={employee.attribute}>
                <td>{employee.attribute}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    style={{ width: "70px" }}
                    onClick={() => deleteEmployee(employee)}
                  >
                    <RiDeleteBin6Line />
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className="pagination"
        itemsCount={count}
        pageChange={handlePageChange}
        pageSize={state.pageSize}
        currentPage={state.currentPage}
      />
    </React.Fragment>
  );
};

export default CustomAttributes;
