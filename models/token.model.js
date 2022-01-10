const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    id: {type:String, required:true,unique:true},
    token: {type: String, required:true},
    exprired: {type: Date, default:Date.now(), expires:900}
},
{collection: 'token'}

)

const model = mongoose.model('Token',tokenSchema)

module.exports = model;