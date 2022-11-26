const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true },
    travellers: { type: Number, required: true },
    budget: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;
