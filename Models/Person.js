const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    }, 
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if it has been modeled (or is new)
    if (!person.isModified('password')) return next();

    
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //replace password with hashed password
        person.password =  hashedPassword;

        next();
    }catch(err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {

    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err) {
        throw(err)
    }
}


// create Person model 
const Person = mongoose.model('Person', personSchema)
module.exports = Person