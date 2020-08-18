import React from 'react';
import './search-box.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchIcon from '@material-ui/icons/Search';

export const SearchBox = ({ placeholder, handleChange }) => {
    return (
        <div><input
            className='search'
            type='search'
            placeholder={placeholder}
            onChange={handleChange}
            style={{
                border:"none",
                borderBottom: "1px solid black"
            }}
        />
            <div className="dropdown">
                <DropdownButton id="dropdown-basic-button" title="All">
                    <Dropdown.Item href="#/action-1">Gastrologist</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Neurologist</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Medicine Spec.</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Cardiologist</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
}