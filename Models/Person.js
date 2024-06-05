const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }, 
    work : {
        type:  String,
        enum : ['chef', 'waiter', 'manager'], // ---------------- condition matching these values ----------------
        require: true
    }, 
    mobile: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true // ----------------  matching save emails ----------------
    }, 
    address: {
        type: String
    }, 
    salary: {
        type: Number,
        required: true
    }
})


// create Person model 
const Person = mongoose.model('Person', personSchema)
module.exports = Person