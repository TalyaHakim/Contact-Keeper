const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact')
const { check, validationResult } = require('express-validator');

// @route         GET api/contacts
// @description   Get all contacts
// @access        Private

router.get('/', auth, async (req, res) => {
    try { 

        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1});
        res.json(contacts);

    } catch (error) {
        console.log(error.msg);
        res.status(500).send('Server error');
    }
})

// @route         POST api/contacts
// @description   Add contact
// @access        Private

router.post('/', 
[ 
    auth, 
    [check('name', 'Name is required').not().isEmpty()] 
],
async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phon, type } = req.body;

    try {
        
        const newContact = new Contact({
            name,
            email,
            phon,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (error) {
        console.log(error.msg);
        res.status(500).send('Server error');
    }


})

// @route         PUT api/contacts/:id
// @description   Update contact
// @access        Private

router.put('/:id', auth, async (req, res) => {

    const { name, email, phon, type } = req.body;

    // Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phon) contactFields.phon = phon;
    if(type) contactFields.type = type;

    try {
        
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true }
        );

        res.json(contact);

    } catch (error) {
        console.log(error.msg);
        res.status(500).send('Server error');
    }
})

// @route         DELETE api/contacts/:id
// @description   Delete contact
// @access        Private

router.delete('/:id',auth, async (req, res) => {
    try {
        
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });

    } catch (error) {
        console.log(error.msg);
        res.status(500).send('Server error');
    }})


module.exports = router;