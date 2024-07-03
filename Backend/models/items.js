const mongoose = require('mongoose');
const { type } = require('os');

const itemSchema = new mongoose.Schema({
    dishId:{
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hawkers",
      },
},{timestamps: true})

const itemsModel = mongoose.model("items",itemSchema);

module.exports = itemsModel;