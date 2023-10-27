leaves = [
  {
      "leave_request_id": 2,
      "employee_id": "1820267651",
      "date": "2023-11-30T18:30:00.000Z",
      "description": "Personal Health Checkup",
      "supervisor_approval": 0,
      "leave_type": "Annual"
  },
  {
      "leave_request_id": 3,
      "employee_id": "1820267651",
      "date": "2023-12-01T18:30:00.000Z",
      "description": "Exam",
      "supervisor_approval": 0,
      "leave_type": "Annual"
  },
  {
      "leave_request_id": 4,
      "employee_id": "1820267651",
      "date": "2023-12-02T18:30:00.000Z",
      "description": "Personal Reasons",
      "supervisor_approval": 0,
      "leave_type": "Annual"
  },
  {
      "leave_request_id": 5,
      "employee_id": "1820267651",
      "date": "2023-10-31T18:30:00.000Z",
      "description": "Request for an annual leave, for a personal tax issue",
      "supervisor_approval": 1,
      "leave_type": "Casual"
  }
]

function getRequests(leaves) {
  let output_list = [];
  leaves.forEach((element) => {
      let templist = {};
      templist['request_id'] = element.leave_request_id;
      templist['employee_id'] = element.employee_id;
      templist['requester_name'] = element.leave_request_id;
      templist['description'] = element.description;
      templist['dates'] = element.date.slice(0,10);
      output_list.push(templist);
  })
  return output_list;}

  console.log(getRequests(leaves));