const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isClerk: {
    required: true,
    default: false,
    type: Boolean,
  },
});

UserSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  this.password = hash;
});

UserSchema.methods.isValidPassword = async function (password) {
  console.log("weitin..", this.password);
  const isValid = bcrypt.compareSync(password, this.password);
  console.log("is valid", true);
  return isValid;
};

module.exports = mongoose.model("User", UserSchema);
