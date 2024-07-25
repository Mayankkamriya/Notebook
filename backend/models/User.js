const mongoose = require ('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
            type : String,
            require: true
        },
    email:{
            type : String,
            require: true,
            unique: true
        },
    password:{
            type : String,
            require: true
        },
    date:{
            type : Date,
            default: Date.now
        }
});
 
const User=  mongoose.model('user', UserSchema);
User.createIndexes(); //We have comment out the below line because we want to add create index function so that in database table our title created
module.exports =User
    // module.exports = mongoose.model('user', UserSchema);
