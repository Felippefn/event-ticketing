const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, min: 18, max: 100 },
  eventsUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event", default: [] }],
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
