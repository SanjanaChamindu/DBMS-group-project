const leaves = [
    {
            paygrade_id: 2,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 3,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 13,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 1,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 4,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 5,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 6,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 7,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 8,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 9,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 10,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 11,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 12,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 14,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 15,
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        }
    ];

    export function getLeaves() {
        return leaves;
    }

    export function getLeave(id) {
        return leaves.find(em => em.leave_id === id);
    }