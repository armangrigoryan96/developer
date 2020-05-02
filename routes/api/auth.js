const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authentication = require("../../middleware/authentication");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route - /api/auth
// @name - Get auth token user
// @desription - provide token get its user
router.get("/", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route - /api/auth/
// @name - Login User
// @desription - provide email, password and be logged in and get token
router.post(
  "/",
  [
    check("email", "Email is not provided!").isEmail(),
    check("password", "Password is not provided!").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ errors: [{ msg: "No such user is registered" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Invalid Credentials!" }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

router.post("/credentials", authentication, async (req, res) => {
  const { name, oldpassword, password } = req.body;
  try {
    let user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Your Old Password is wrong!" }] });
    }

    const salt = await bcrypt.genSalt(10);

    //Updating
    user.name = name;
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

router.delete("/", authentication, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    await Profile.findOneAndDelete({ user: req.user.id });
    res.json({ status: "deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
