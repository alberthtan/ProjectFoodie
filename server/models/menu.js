const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    menuItems : [
        {
        title: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String},
        ingredients: {type: String}
    }]



});

module.exports = mongoose.model('Menu', menuSchema);