const mongoose = require('mongoose');
const Schema = mongoose.Schema

const subscriptionSchema = mongoose.Schema({
    userTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, { timestamps: true })

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = { Subscription }