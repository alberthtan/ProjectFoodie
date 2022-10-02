const mongoose = require('mongoose');
const { menuItemSchema } = require('./menuItems')

const categorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },

    menuItems : [menuItemSchema]
})

module.exports = mongoose.model('Category', categorySchema);