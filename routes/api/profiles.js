const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const config = require("config");
const authentication = require("../../middleware/authentication");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@ localhost:5000/api/profiles
//
router.get("/me", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json([{ msg: "This user does not have a profile!" }]);
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(404).json([{ msg: "Server Error" }]);
  }
});

//About the user

router.post(
  "/about",
  [
    authentication,
    [
      check("birth", "Your Birth date is required!")
        .not()
        .isEmpty(),
      check("gender", "Your Gender is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const profile = await Profile.findOne({
        user: req.user.id
      });
      let { birth, age, gender, profession, skills, hobbies, bio } = req.body;

      if (typeof skills === "string") {
        skills = skills.split(",").map(elem => elem.trim());
      }
      if (typeof hobbies === "string") {
        hobbies = hobbies.split(",").map(elem => elem.trim());
      }

      profile.about = {
        birth,
        age,
        gender,
        profession,
        skills,
        hobbies,
        bio
      };
      await profile.save();
      res.json(profile.about);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Add experience
router.post(
  "/experience",
  [
    authentication,
    [
      check("jobtitle", "Your Job Title is Required!")
        .not()
        .isEmpty(),
      check("company", "Your Company is required!")
        .not()
        .isEmpty(),
      check("location", "Your Location  is required!")
        .not()
        .isEmpty(),
      check("from", "Your From Date is required!")
        .not()
        .isEmpty(),
      check("to", "Your To Date is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const profile = await Profile.findOne({
        user: req.user.id
      });
      profile.experience.unshift(req.body);
      await profile.save();
      res.json(profile.experience);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Add education
router.post(
  "/education",
  [
    authentication,
    [
      check("program", "Your Institution Program is Required!")
        .not()
        .isEmpty(),
      check("institution", "Your Institution Name is required!")
        .not()
        .isEmpty(),
      check("location", "Your Location  is required!")
        .not()
        .isEmpty(),
      check("from", "Your From Date is required!")
        .not()
        .isEmpty(),
      check("to", "Your To Date is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const profile = await Profile.findOne({
        user: req.user.id
      });

      profile.education.unshift(req.body);
      await profile.save();
      res.json(profile.education);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//Add my contact
router.post(
  "/contact",
  [
    authentication,
    [
      check("location", "Your Location  is required!")
        .not()
        .isEmpty(),
      check("email", "Your Email is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(404).json([{ msg: "No such profile exists" }]);
      }

      profile.contact = req.body;
      await profile.save();
      res.json(profile.contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Add Social contacts
router.post("/contact/socials", [authentication], async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json([{ msg: "No such profile exists" }]);
    }

    profile.contact.socials = req.body;
    await profile.save();
    res.json(profile.contact.socials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/experience/:exp_id", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (!profile) {
      return res.status(404).json({ errors: { msg: "profile not found" } });
    }
    const exp = profile.experience.filter(
      elem => elem.id !== req.params.exp_id
    );
    if (!exp) {
      return res.status(404).json({ errors: { msg: "experience not found" } });
    }
    profile.experience = exp;
    await profile.save();
    res.json(profile.experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/experience/:exp_id", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (!profile) {
      return res.status(404).json({ errors: { msg: "profile not found" } });
    }
    const exp = profile.experience.find(elem => elem.id === req.params.exp_id);
    if (!exp) {
      return res.status(404).json({ errors: { msg: "experience not found" } });
    }

    res.json(exp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.patch("/experience/:exp_id", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ errors: { msg: "profile not found" } });
    }
    let exp = profile.experience.find(elem => elem.id === req.params.exp_id);

    if (!exp) {
      return res.status(404).json({ errors: { msg: "experience not found" } });
    }
    exp = req.body;
    let experienceFields = profile.experience;
    for (let i = 0; i < experienceFields.length; i++) {
      if (experienceFields[i].id === req.params.exp_id) {
        experienceFields[i] = req.body;
      }
    }
    // experienceFields.forEach(elem => {
    //   if (elem.id === req.params.exp_id) {
    //     elem = req.body
    //   }
    // });

    await profile.save();
    res.json(profile.experience);
    // res.json(profile.experience.find(
    //   elem => elem.id === id
    // ))
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/education/:edu_id", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (!profile) {
      return res.status(404).json({ errors: { msg: "profile not found" } });
    }
    const edu = profile.education.filter(elem => elem.id !== req.params.edu_id);
    if (!edu) {
      return res.status(404).json({ errors: { msg: "education not found" } });
    }
    profile.education = edu;
    await profile.save();
    res.json(profile.education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/education/:edu_id", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (!profile) {
      return res.status(404).json({ errors: { msg: "profile not found" } });
    }
    const edu = profile.education.find(elem => elem.id === req.params.edu_id);
    if (!edu) {
      return res.status(404).json({ errors: { msg: "education not found" } });
    }

    res.json(edu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.patch("/education/:edu_id", authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ errors: { msg: "profile not found" } });
    }
    let edu = profile.education.find(elem => elem.id === req.params.edu_id);

    if (!edu) {
      return res.status(404).json({ errors: { msg: "education not found" } });
    }
    edu = req.body;
    let educationFields = profile.education;
    for (let i = 0; i < educationFields.length; i++) {
      if (educationFields[i].id === req.params.edu_id) {
        educationFields[i] = req.body;
      }
    }
    // educationFields.forEach(elem => {
    //   if (elem.id === req.params.exp_id) {
    //     elem = req.body
    //   }
    // });

    await profile.save();
    res.json(profile.education);
    // res.json(profile.education.find(
    //   elem => elem.id === id
    // ))
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get profiles
router.get("/", authentication, async (req, res) => {
  const profiles = await Profile.find({}).populate("user", [
    "_id",
    "name",
    "avatar"
  ]);
  const developers = profiles.filter(elem =>
     elem.user.id !== req.user.id
     ); 
  res.json(developers);
});
//GEt profile
router.get("/:dev_id", async (req, res) => {
  const profile = await Profile.findById(req.params.dev_id).populate("user", [
    "_id",
    "name",
    "avatar"
  ]);
 
  res.json(profile);
});
module.exports = router;
