const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    image: {
        type: String,
        required: [true, "Image url is required"]
    },
    treasures: {
        type: Number,
        required: [true, "Number of treasures is required"],
        validate: {
            validator: function(numTreasure){
                if (numTreasure <0){
                    return false;
                }
                else return true;
            }
        }
    },
    catch_phrase: {
        type: String,
        required: [true, "Catch phrase is required"]
    },
    position: {
        type: String,
        required: [true, "Crew position is required"]
    },
    pegleg: {
        type: Boolean,
        required: [true, "Peg leg validation"]
    },
    eyepatch: {
        type: Boolean,
        required: [true, "Eye patch validation"]
    },
    hookhand: {
        type: Boolean,
        required: [true, "Hook hand validation"]
    }
})

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports = Pirate;