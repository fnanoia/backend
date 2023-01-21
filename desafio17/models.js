const mongoose = require("mongoose");
//node deprecation debug log. mongoose 7
mongoose.set("strictQuery", false);

const bcrypt = require("bcrypt");

//modelo y schema para la BBDD
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

//hashear pwd antes de guardar en la BBDD
userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    //bcrypt hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(this.password, salt);

    user.password = hash;
    return next();
  } catch (err) {
    throw new Error("Error hashing \n" + err);
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
