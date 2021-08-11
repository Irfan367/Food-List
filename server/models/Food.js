const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    sinceIAteIt: {
        type: Number,
        required: true
    }
})

const Food = mongoose.model("foodda",foodSchema);
module.exports = Food;