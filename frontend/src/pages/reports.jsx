import React, { Component } from 'react';
import CustomReport from './customReport';
import EmployeeByDept from './employeeByDept';
import EmployeeReports from './employeeReports';
import LeavesByDept from './leavesByDept';

class Reports extends Component {
    render() {
        console.log('Reports');
        return (
            <div className='reports'>
                <EmployeeByDept />
                <LeavesByDept />
                <EmployeeReports />
                <CustomReport />
            </div>
        );
    }
}

export default Reports;