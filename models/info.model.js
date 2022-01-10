const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, sparse: true},
    email: {type: String, required: true, unique: true},
    gender: {type: String, sparse: true},
    birthday: {type:Date, sparse: true},
    country: {type: String, sparse: true},
    level: {type: String, sparse: true}
},
{collection: 'account_infos'}

)

const model = mongoose.model('Infos',infoSchema)

module.exports = model;