import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DropdownFilter.css';

class DropdownFilter extends Component {
    render() { 
        const { parameters, selectedParameter, onParameterSelect } = this.props;
        return ( 
            <select 
                value={selectedParameter}
                onChange={() => {}}
                className='dropdownFilter'
            >
            {
                parameters.map( (parameter,index) => (
                    <option 
                        key={index} 
                        onClick={() => onParameterSelect(parameter)} 
                        value={parameter}
                    >
                        {parameter}
                    </option>
                ))
            }
        </select>            
        );
    }
}
 
export default DropdownFilter;