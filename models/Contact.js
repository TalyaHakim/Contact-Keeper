const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phon: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Contact', contactSchema);