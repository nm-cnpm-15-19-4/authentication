const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    id: {type:String, required:true,unique:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String}
},
{collection: 'account'}

)

const model = mongoose.model('Account',accountSchema)

module.exports = model;