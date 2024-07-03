const mongoose = require('mongoose');

const hawkerSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latCoordinate: {
        type: String,
        required: true
    },
    lngCoordinate: {
        type: String,
        required: true
    },
},{timestamps: true})

const hawkerModel = mongoose.model("hawkerdatas",hawkerSchema);

module.exports = hawkerModel;