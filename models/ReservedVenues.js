const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservedVenuesSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    venueId: {
        type: String,
        required: true
    },
    date: {
      type: String,
      required: true
    },
    register_date: {
      type: Date,
      default: Date.now
    }
});

module.exports = ReservedVenues = mongoose.model('reservedVenues', ReservedVenuesSchema)