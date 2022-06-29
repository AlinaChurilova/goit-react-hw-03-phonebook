import React from "react";
import PropTypes from 'prop-types';
import s from './Phonebook.module.css';

const Filter = ({ filter, onFilter }) => {
    return <label className={s.Label}>
            Find contacts by name 
                <input className={s.Input}
          type="text"
          value={filter}
          onChange = {onFilter}
                />
            </label>
}

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}
export default Filter;