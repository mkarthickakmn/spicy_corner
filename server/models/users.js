const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
     userpassword: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },   
    phone: {
        type: String,
        required: true,
        minlength: 10
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function() {
 var obj = this.toObject();
 delete obj.userpassword;
 return obj;
}

userSchema.statics.findByCredentials = async (userEmail,password) => {
    
    const user = await User.findOne({userEmail})
    if (!user) {
        return {
            error: 'not registered'
        }
    }

    const isMatch = await bcrypt.compare(password, user.userpassword)

    if (!isMatch) {
        return {
            error: 'invalid credentials'
        }
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('userpassword')) {
        user.userpassword = await bcrypt.hash(user.userpassword, 8)
    }

    next();
})


const User = mongoose.model('User', userSchema)

module.exports = User