import React, { Component } from 'react';
import AllEmployees from './allEmployees';
import NewEmployee from './newEmpoyee';
import Subordinates from './subordinates';

class EmployeeDetails extends Component {
    state = {  }
    render() {
        return (
            <div className='employeeDetails'>
                <AllEmployees/>
                <Subordinates/>
                <NewEmployee/>
            </div>
        );
    }
}

export default EmployeeDetails;