const mongoose = require("mongoose");

const AssuranceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  type: { type: String, enum: ["theft", "accident"], required: true },
  period: { type: Number, required: true },
  signatureDate: { type: Date, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  ageOfUser: { type: Number, required: true },
  existingPreviousInsurance: { type: Boolean, required: true },
  numberOfTheftInYourRegion: { type: Number, required: true },
  yearOfConstruction: { type: Number, required: true },
});

const Assurance = mongoose.model("Assurance", AssuranceSchema);

module.exports = Assurance;
