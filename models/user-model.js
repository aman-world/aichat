/**
 * @file MongoDB data model for users.
 */

'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    phone: { type: String },
    active: { type: Boolean, default: false },
    avatarUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
