const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Deck = require('./Deck');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: {
        type: Array,
        default: [],
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }
                    user.password = hash;
                    next();
                });
            }
        });
    } else {
        return next();
    }
});

UserSchema.methods.validatePassword = async function validatePassword(
    password,
    hash
) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (e) {
        console.log('\n\n e in validating password ? ', e, '\n\n');
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
