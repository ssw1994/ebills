const mongoose = require("mongoose");
const billSchema = require("../Schemas/bill.schema");

const billModel = mongoose.model("bills", billSchema);

module.exports = billModel;
