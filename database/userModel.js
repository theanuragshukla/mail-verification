const { Schema, default: mongoose } = require("mongoose");

const usersSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  firebaseId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("users", usersSchema, "users");
