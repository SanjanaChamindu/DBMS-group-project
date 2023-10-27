rEach((element) => {
      let templist = {};
      templist['request_id'] = element.leave_request_id;
      templist['employee_id'] = element.employee_id;
      templist['requester_name'] = element.leave_request_id;
      templist['description'] = element.description;
      templist['dates'] = element.dates;
      output_list.push(templist);
  })