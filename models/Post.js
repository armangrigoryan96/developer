const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  send: [
    {
      messagetype: {
        type: "String",
        required: true
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },

      message: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  receive: [
    {
      messagetype: {
        type: String,
        required: true
      },
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      message: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Post = mongoose.model("posts", PostSchema);
