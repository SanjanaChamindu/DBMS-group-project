import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import { getDropdownData } from '../services/customFields.js';

const CustomReports = () => {
    const navigate = useNavigate()
    const [selectedOptions, setSelectedOptions] = useState({});
    const [dropdownData, setDropdownData] = useState([]);
    console.log("selected Option is", selectedOptions);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const attribsResponse = await axios.get("/queries/attribs");
                const attributeNames = attribsResponse.data;
    
                // Use Promise.all to fetch attribute values concurrently
                const attributeValuePromises = attributeNames.map(async (element) => {
                    const q = "/queries/attribvals/" + element;
                    console.log(q);
                    const response = await axios.get(q);
                    return { label: element, options: [response.data] };
                });
    
                // Wait for all attribute value requests to complete
                const tempData = await Promise.all(attributeValuePromises);
                console.log(tempData);
                setDropdownData(tempData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    

    const handleOptionSelect = (dropdownLabel, option) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [dropdownLabel]: option
        }));
    };

    const navigateTo = () => {
        const keys = Object.keys(selectedOptions);

        if (keys.length === 0) {
            Swal.fire({
                title: 'No options selected',
                text: `Select at least one option to generate the report`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Close'
            })
            console.log("No elements in selectedOptions");
            return;
        }

        let passingData={selectedOptions};
        navigate(`/dashboard/viewCustomReports`, { state: { passingData } });

        //call the backend api to get the data
    }

    return (
        <div className='reports'>
            <h1 className='paragraph'>Generate Reports Based On Custom Fields</h1>
                {dropdownData.map((dropdown, index) => (
                <div key={index}>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        {selectedOptions[dropdown.label] ? selectedOptions[dropdown.label] : `Select ${dropdown.label}`}
                    </button>
                
                    <ul className="dropdown-menu">
                        {dropdown.options.map(item => (
                            <li key={item}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleOptionSelect(dropdown.label, item)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button className="btn btn-primary" type="button" onClick={navigateTo}>Generate</button>
            </div>
            
        </div>
    );
}

export default CustomReports;