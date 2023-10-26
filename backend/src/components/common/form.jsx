import Joi from 'joi-browser';
import { Component } from 'react';
import Input from './input';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {                                      // validate the input fields
        const options = { abortEarly: false };              // abortEarly is set to false to display all the errors
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};                                  // create an empty object
        for (let item of error.details)                     // iterate over the error.details array
            errors[item.path[0]] = item.message;            // add a new property to the errors object
        return errors;

    };

    validateProperty = ({name, value}) => {                 // validate a single input field
        const obj = { [name]: value };                      // create a new object with the computed property syntax
        const schema = { [name]: this.schema[name] };       // create a new schema object with the computed property syntax
        const { error } = Joi.validate(obj, schema);        // validate the input field
        return error ? error.details[0].message : null;     // if there is an error, return the error message
    };

    handleSubmit = e => {
        e.preventDefault();
    
        const errors = this.validate();
        this.setState({ errors: errors || {} });
    
        if (errors) return;
    
        this.doSubmit();
    };
    
    handleChange = ({currentTarget: input}) => {            // event handler, handles change event raised by the component

        const errors = { ...this.state.errors };            // clone the errors object
        const errorMessage = this.validateProperty(input);  // validate the input field
        if (errorMessage) errors[input.name] = errorMessage;// if there is an error, add it to the errors object
        else delete errors[input.name];                     // if there is no error, delete the error from the errors object

        const data = { ...this.state.data };                // clone the data object
        data[input.name] = input.value;
        this.setState({ data, errors });                    // update the state object
    };

    renderCheck(name, label) {
        const {data} = this.state;
    
        const handleCheckboxChange = () => {
            const newData = { ...data, [name]: !data[name] };   // clone the data object
            this.setState({ data: newData });
        };
    
        return (
            <div className="remember">
                <section>
                    <input
                        type="checkbox"
                        name={name}
                        id={name}                             //id is used to link the label to the checkbox
                        checked={data[name]}
                        label={label}
                        onChange={handleCheckboxChange}      //raise an event when the value of the checkbox changes
                    />
                    <label htmlFor={name}>{label}</label>
                </section>
            </div>
        );
    };

    renderButton(label) {                           // render the button in extended component
        return (
            <div className="input-submit">
                <button disabled={this.validate()} className="submit-btn" id="submit"/>
                <label htmlFor="submit">{label}</label>
            </div>
        );
    };

    renderInput(name, label, type = "text") {       // render the input in field extended component
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}        //raise an event when the value of the input field changes
                error={errors[name]}
            />
        );
    }
}

export default Form;