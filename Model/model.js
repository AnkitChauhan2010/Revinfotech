
const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const schema = mongoose.Schema

const userJson = new schema({
    email: { type: String, lowercase: true },
    name: { type: String },
    password: { type: String },
    city : {type : String},
    state : {type:String},
    ethAdress : {type:String},
    ethPrivateKey : {type:String},
     

    userType: {
        type: String,
        enum: ["ADMIN", "USER", "BUSINESS"],
        default: "USER"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }

},

 { timestamps: true })

    userJson.plugin(mongoosePaginate)

module.exports = mongoose.model('user', userJson)
