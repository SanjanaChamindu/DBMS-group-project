import React, { Component } from 'react';

class NewEmployee extends Component {
    state = {  }
    render() {
        console.log("Add new employee")
        return (
            <div className='employeeDetails'>
                <h1>Reports/New employee</h1>
            </div>
        );
    }
}

export default NewEmployee;