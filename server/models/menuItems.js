const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },

    description : {
        type: String,
        trim: true
    },

    price : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('MenuItem', menuItemSchema);

// module.exports = MenuItem;