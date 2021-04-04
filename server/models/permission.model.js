const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    userId: {type: String},
    catalog: {type: Boolean},
    proposals1: {type: Boolean},
    proposals2: {type: Boolean},
    people: {type: Boolean},
    orders: {type: Boolean}
},
{
    timestamps: false
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;