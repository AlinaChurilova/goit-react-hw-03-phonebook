import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Phonebook/ContactForm';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';
import s from '../components/Phonebook/Phonebook.module.css';


class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedData = JSON.parse(contacts);
    if (parsedData) {
      this.setState({ contacts: parsedData });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    
    this.setState(prevState => {
      const savedName = prevState.contacts.find(Cont => Cont.name === contact.name);
     
      return savedName !== undefined ? alert(`${contact.name} is already in contacts!`)
        : { contacts: [...prevState.contacts, contact], }
     
    })
  }

  onChangeFilter = e => {
    return this.setState({ filter: e.currentTarget.value });
  }

  onDeleteContact = id => {
    this.setState(prevState => ({

      contacts: prevState.contacts.filter(contact => contact.id !== id),

    }));
  }
  
    getVisibleContacts = () => {
    const {contacts} = this.state;    
    const {filter}= this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact => 
      contact.name.toLocaleLowerCase().includes(normalizedFilter))
    };
  
  render() {
    
    const contact = this.getVisibleContacts();

    return (
      
      <div className={s.Container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onAddContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter = {this.onChangeFilter}/>
        <ContactList contacts = {contact} onDelete = {this.onDeleteContact} />
      </div>
    )
   
  };
}

export default App;
