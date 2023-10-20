import Joi from 'joi-browser';
import React from 'react';
import Form from '../components/common/form';
import './css/newEmployee.css';

class NewEmployee extends Form {
    state = {
        data: { 
            username: '', 
            password: '', 
            permission_level: 1, // Set default permission level
            nic: '', 
            birthdate: '', 
            nationality: ''
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username").max(20),
        password: Joi.string().required().label("Password").min(7).max(15),
        permission_level: Joi.number().integer().label("Permission Level").min(1).max(3),
        nic: Joi.string().required().label("NIC").min(10).max(12),
        birthdate: Joi.date().required().label("Birthdate"),
        nationality: Joi.string().required().label("Nationality").max(20)
    };

    doSubmit = () => {
        console.log('Submitted add new employees');
    };

    render() {
        return (
            <div className='employeeDetails'>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", "text")}
                    {this.renderInput("nic", "NIC", "text")}
                    {this.renderInput("birthdate", "Birthdate", "date")}
                    {this.renderInput("nationality","Nationality","text")}
                    {this.state.data.permission_level && this.renderDropdown("permission_level", "Permission Level", [1, 2, 3])}
                    {this.renderButton("Add Employee")}
                </form>
            </div>
        );
    }
}

export default NewEmployee;