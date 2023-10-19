import Joi from 'joi-browser'; // use joi-browser for validation
import React from 'react';
import Form from '../components/common/form';
import './css/newEmployee.css';

class NewEmployee extends Form {
    state = {                                       // state object, stores data that the component needs
        data: { username: '', password: '',permission_level:1 ,nic: '',birthdate:'',nationality:''},
        errors: {}
    };

    
    schema = {                                      // schema object, from joi-browser
        username: Joi.string().required().label("Username").max(20), // label is used to display the name of the field in the error message
        password: Joi.string().required().label("Password").min(7).max(15),      // min is used to set the minimum length of the password
        permission_level: Joi.number().integer().label("Permission Level").min(1).max(3),
        nic: Joi.string().required().label("NIC").min(10).max(12),
        birthdate: Joi.date().required().label("Birthdate"),
        nationality: Joi.string().required().label("Nationality").max(20)
    };

    
    doSubmit = () => {
        // Call the server
        console.log('Submitted add new employees');
    };

    render() {
        console.log("Add new employee")
        return (
            <div className='employeeDetails'>
                <form onSubmit={this.handleSubmit}>                     {/*raise an event when the form is submitted, button was clicked*/}
                    {this.renderInput("username", "Username", "text")}
                    {this.renderInput("nic", "NIC", "text")}
                    {/*gender*/}
                    {this.renderInput("birthdate", "Birthdate", "date")}
                    {this.renderInput("nationality","Nationality","text")}
                    {this.renderInput("permission_level","Permission Level", "number")}
                    {this.renderButton("Add Employee")}                        {/*render the button in base form component*/}
                </form>
            </div>
        );
    }
}

export default NewEmployee;