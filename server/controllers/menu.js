const Menu = require('../models/menu')

exports.createMenu = (req, res) => {
    const {title, categories, menuItems} = req.body
    res.send("ok")   
}