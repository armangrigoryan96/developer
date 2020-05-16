const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authentication = require("../../middleware/authentication");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

router.post("/recover", async (req, res) => {
  try {
    const users = await User.find({});
    // res.json(users);
    for (let i = 0; i < users.length; i++) {
     new Post({
        user: users[i]._d
      });
      const postNew = await Post.findOne
      ({ user: users[i].id })
      .populate(
        "user",
        ["name", "avatar"]
      );
      await postNew.save();
    }

    const posts = await Post.find({});

    res.json(posts);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/delete", async (req, res) => {
  const posts = await Post.deleteMany({});
  await posts.save();
  res.json(posts);
});

router.get("/", authentication, async (req, res) => {
  try {
    const posts = await Post.findOne({ user: req.user.id });
    if (!posts) {
      return res.status(404).json({ errors: [{ msg: "Posts not found" }] });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/send",
  [
    authentication,
    [
      check("messagetype", "Messege type is required")
        .not()
        .isEmpty(),
      check("to", "Receiver is not found!")
        .not()
        .isEmpty(),
      check("message", "Messege is required")
        .not()
        .isEmpty()
      // check("date", "Date is required")
      //   .not()
      //   .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      //Date problem not solved 

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const sender = await Post.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

      if (!sender) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Sender is not found" }] });
      }
      const receiver = await Post.findOne({ user: req.body.to }).populate(
        "user",
        ["name", "avatar"]
      );
      if (!receiver) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Receiver is not found" }] });
      }

      const { messagetype, to, message, date } = req.body;
      const from = await User.findById(req.user.id).select("-password");

      sender.send.unshift({
        messagetype,
        to,
        message,
        date: date ? date : Date.now
      });

      receiver.receive.unshift({
        messagetype,
        from,
        message,
        date
      });

      await sender.save();
      await receiver.save();

      res.json(sender);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
