import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactsFilter = () => {
    const contactContaxt =  useContext(ContactContext);

    const text = useRef('');

    const { filterContacts, clearFilter, filtered } = contactContaxt;

    useEffect(() => {
        if(filtered === null) {
            text.current.value ='';
        }
    }) 

    const onChange = e => {
        if (text.current.value !== ''){
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    
        return (
            <form>
                <input 
                ref={text} 
                type='text' 
                placeholder='Filter Contacts...'
                onChange={onChange}/>
            </form>
        )
}

export default ContactsFilter;
