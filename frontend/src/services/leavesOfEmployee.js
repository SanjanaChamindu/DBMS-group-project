const leaves= [
    {
        leave_id: "leave_1",
        dates: ["2023-10-01", "2023-10-02", "2023-10-03"],
        leave_type : "Sick Leave",
        status: "Approved",
    },
    {
        leave_id: "leave_2",
        dates: ["2023-10-04", "2023-10-05", "2023-10-06"],
        leave_type : "Casual Leave",
        status: "Approved",
    },
    {
        leave_id: "leave_3",
        dates: ["2023-10-07", "2023-10-08"],
        leave_type : "Sick Leave",
        status: "Approved",
    },
    {
        leave_id: "leave_4",
        dates: ["2023-10-09", "2023-10-10", "2023-10-11"],
        leave_type : "Casual Leave",
        status: "Pending",
    },
    {
        leave_id: "leave_5",
        dates: ["2023-10-12", "2023-10-13"],
        status: "Approved",
    },
    {
        leave_id: "leave_6",
        dates: ["2023-10-14", "2023-10-15"],
        status: "Pending",
    },
    {
        leave_id: "leave_7",
        dates: ["2023-10-16", "2023-10-17"],
        status: "Approved",
    },
    {
        leave_id: "leave_8",
        dates: ["2023-10-18", "2023-10-19", "2023-10-20"],
        status: "Pending",
    },
    {
        leave_id: "leave_9",
        dates: ["2023-10-21"],
        status: "Approved",
    },
    {
        leave_id: "leave_10",
        dates: ["2023-10-22", "2023-10-23", "2023-10-24"],
        status: "Pending",
    },
];

export function getEmpLeaves() {
    return leaves;
}