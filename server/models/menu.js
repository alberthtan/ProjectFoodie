const mongoose = require('mongoose');
const { menuItemSchema } = require('./menuItems')
const { categorySchema } = require('./menuCategories')

const menuSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },

    categories: [categorySchema],

    menuItems: [menuItemSchema]

});

module.exports = mongoose.model('Menu', menuSchema);

// module.exports = Menu;