const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  about: {
    birth: {
      type: Date
      // required: true
    },
    age: {
      type: Number
      // required: true
    },
    gender: {
      type: String
      // required: true,
    },

    profession: {
      type: String
    },
    skills: {
      type: Array
    },
    hobbies: {
      type: Array
    },
    bio: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  experience: [
    {
      jobtitle: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        default: Date.now
      },
      jobdescription: {
        type: String
      }
    }
  ],
  education: [
    {
      program: {
        type: String,
        required: true
      },
      institution: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        default: Date.now
      },
      eddescription: {
        type: String
      }
    }
  ],

  contact: {
    myoffice: {
      type: String
    },
    location: {
      type: String
      // required: true
    },
    phone: {
      type: String
    },
    email: {
      type: String
      // required: true
    },
    website: {
      type: String
    },
    socials: {
      facebook: {
        type: String,
        default: ""
      },
      instagram: {
        type: String,
        default: ""
      },
      twitter: {
        type: String,
        default: ""
      },
      linkedin: {
        type: String,
        default: ""
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
