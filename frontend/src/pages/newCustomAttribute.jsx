import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewCustomAttribute = () => {
    return (
        <React.Fragment>
            <Link to="/dashboard/custom-attributes">
                <Button style={{ marginLeft: '20px', marginRight: '10px', marginTop: '10px' }}>
                    Back
                </Button>
            </Link>

            <div className='paragraph'>
                <h1>New Custom Attribute</h1>
            </div>
        </React.Fragment>
    );
}

export default NewCustomAttribute;