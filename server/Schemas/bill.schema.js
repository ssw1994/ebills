const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  billDate: Date,
  paidDate: Date,
  unitConsumed: Number,
  amount: Number,
});

module.exports = billSchema;
