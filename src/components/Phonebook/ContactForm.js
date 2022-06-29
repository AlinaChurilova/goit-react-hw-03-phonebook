import React, { Component } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './Phonebook.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    };

    id = nanoid()

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    }

    reset = () => {
       return this.setState({ name: '', number: '' });
    }


    render() {
        const { name, number } = this.state;
        return (
          <form className={s.Form} onSubmit = {this.handleSubmit}>
            <label className={s.Label} htmlFor={this.id}>
            Name 
                <input className={s.Input}
          type="text"
          value={name}
          onChange = {this.handleChange}

          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer,
           Charles de Batz de Castelmore d'Artagnan"
          required
                />
            </label>
                
            <label className={s.Label}>
            Number 
                <input className={s.Input}
            type="tel"
            value={number}
            onChange={this.handleChange}
                        
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
                />
            </label>
  
          <button className={s.Button} type='submit'>Add contact</button>
        </form>  
        )
    }
}

ContactForm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}
export default ContactForm;