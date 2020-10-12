const express = require('express');
const router = express.Router();
const { Subscription } = require("../models/Subscription");

//=================================
//             Subscribe
//=================================


router.post('/subscribeNumber', (req, res) => {
  Subscription.find({ "userTo" : req.body.userTo })
    .exec((err, subscription) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true, subscribeNumber: subscription.length })
    })
})

router.post('/subscribed', (req, res) => {
  Subscription.find({ "userTo" : req.body.userTo, "userFrom" : req.body.userFrom })
    .exec((err, subscribed) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true, subscribed: subscribed.length > 0 })
    })
})

router.post('/subscribe', (req, res) => {
  let subscribe = new Subscription(req.body)
  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true, doc })
  })
})

router.post('/unsubscribe', (req, res) => {
  Subscription.findOneAndDelete({ "userTo" : req.body.userTo, "userFrom" : req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, doc })
    })
})

module.exports = router;
