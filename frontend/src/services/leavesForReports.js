const leaves= [
    {
        leave_id: "leave_1",
        dates: ["2023-10-01", "2023-10-02", "2023-10-03"],
        requested_date: "2023-09-30",
        employee_id: "emp_1",
        reason: "Going to a wedding",
        leave_type : "Sick Leave",
        employee_name : "John Doe"        
    },
    {
        leave_id: "leave_2",
        dates: ["2023-10-04", "2023-10-05", "2023-10-06"],
        requested_date: "2023-10-03",
        employee_id: "emp_1",
        reason: "Going to a wedding",
        leave_type : "Casual Leave",
        employee_name : "John Doe"
        
    },
    {
        leave_id: "leave_3",
        dates: ["2023-10-07", "2023-10-08"],
        requested_date: "2023-10-06",
        employee_id: "emp_1",
        reason: "Going to a wedjferfewding",
        leave_type : "Sick Leave",
        employee_name : "John Doe"
           },
    {
        leave_id: "leave_4",
        dates: ["2023-10-09", "2023-10-10", "2023-10-11"],
        requested_date: "2023-10-08",
        employee_id: "emp_1",
        reason: "Going to a wedding",
        leave_type : "Casual Leave",
        employee_name : "John Doe"
            },
    {
        leave_id: "leave_5",
        dates: ["2023-10-12", "2023-10-13"],
        requested_date: "2023-10-11",
        
    },
    {
        leave_id: "leave_6",
        dates: ["2023-10-14", "2023-10-15"],
        requested_date: "2023-10-13",
        employee_id: "emp_1",
        reason: "Going to a wedding",
        employee_name : "John Doe"
            },
    {
        leave_id: "leave_7",
        dates: ["2023-10-16", "2023-10-17"],
        employee_id: "emp_1",
        reason: "Going to a wedding",
        requested_date: "2023-10-15",
        employee_name : "John Doe"
        
    },
    {
        leave_id: "leave_8",
        dates: ["2023-10-18", "2023-10-19", "2023-10-20"],
        employee_id: "emp_1",
        reason: "Going to a wedding",
        requested_date: "2023-10-17",
            },
    {
        leave_id: "leave_9",
        dates: ["2023-10-21"],
        requested_date: "2023-10-20",
        employee_id: "emp_1",
        reason: "Going to a wedding",
           },
    {
        leave_id: "leave_10",
        dates: ["2023-10-22", "2023-10-23", "2023-10-24"],
        requested_date: "2023-10-21",
        employee_id: "emp_1",
        reason: "Going to a wedding",
            },
];

export function getEmpLeaves() {
    return leaves;
}