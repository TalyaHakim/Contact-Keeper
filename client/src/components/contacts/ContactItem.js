import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({contact}) => {

    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { _id, name, email, phon, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'> 
            {name}{' '}
            <span style={{ float: 'right' }}
            className={
            (type === 'professional' ? 'badge badge-success' : 'badge badge-primary')
            }> 
            {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open'/> {email} 
                    </li>
                )}
                {phon && (
                    <li>
                        <i className='fas fa-phon'/> {phon} 
                    </li>
                )}
                </ul>
                <p>
                    <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
                </p>
        </div>
    )
}

ContactItem.propTypes = { 
    contact: PropTypes.object.isRequired,
}

export default ContactItem;