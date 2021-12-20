import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { addContact, updateContact, current, clearCurrent } = contactContext;

    const [ contact, setContact ] = useState({
        name: '',
        email:'',
        phon:'',
        type:'personal'
    });

    const { name, email, phon, type } = contact;

    const onChange = e => setContact({...contact, [e.target.name] : e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    }

    useEffect(() => {
        if(current !== null) {
         setContact(current);
        } else {
         setContact({
            name: '',
            email:'',
            phon:'',
            type:'personal'
         });
        }  
    }, [contactContext, current]);

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
            type='text' 
            placeholder='Name' 
            name='name' 
            value={name} 
            onChange={onChange}/>
            <input 
            type='email' 
            placeholder='Email' 
            name='email' 
            value={email} 
            onChange={onChange}/>
            <input 
            type='text' 
            placeholder='Phon' 
            name='phon' 
            value={phon} 
            onChange={onChange}/>
            <h5>Contact Type</h5>
            <input 
            type='radio' 
            name='type' 
            value='personal' 
            checked={type === 'personal'} 
            onChange={onChange}/>Personal{' '}
            <input 
            type='radio' 
            name='type' 
            value='professional' 
            checked={type === 'professional'} 
            onChange={onChange}/>Professional{' '}
            <div>
                <input 
                type='submit' 
                value= {current ? 'Update Contact' : 'Add Contact'} 
                className='btn btn-primary btn-block'/>
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
                    </button>
                </div>
            )}
        </form>
    )
}

export default ContactForm;