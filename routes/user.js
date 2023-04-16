const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/dbConfig");
const bodyParser = require("body-parser");

router.post("/api/users/signup", bodyParser.json(), async (req, res) => {
  const { body } = req;

  try {
    const user = await db.User.create(body);
    res.json({ user, isSuccess: true });
  } catch (e) {
    console.log("\n\n err in signing up user = ", e, "\n\n");
    res.status(400).json({ isSuccess: false, error: e });
  }
});

router.post("/api/users/login", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  db.User.findOne({
    email,
  }).exec(async (err, user) => {
    try {
      if (err) {
        res.status(500).send({ isSuccess: false, error: err });
        return;
      }

      if (!user) {
        return res
          .status(404)
          .json({ error: "User Not found.", isSuccess: false });
      }

      let passwordIsValid = await user.validatePassword(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          isSuccess: false,
          error: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.json({
        user,
        isSuccess: true,
        token,
      });
    } catch (error) {
      console.log("\n \n error inside login user controller", error, "\n \n");
      res.json({
        error,
        isSuccess: false,
      });
    }
  });
});

router.get("/api/users/get-one/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await db.User.findOne({ _id: userId });
    res.status(200).json({ user });
  } catch (err) {
    console.log("\n\n err inside get one user controller", err, "\n \n");
    res.status(400).json({ isSuccess: false, error: err });
  }
});

router.get("/api/users/get-all", async (req, res) => {
  try {
    const users = await db.User.find().sort({ email: 1 });
    res.status(200).json({ users });
  } catch (e) {
    console.log("\n error in retrieving all users = ", e, "\n\n");
    res.status(400).json({ error: e });
  }
});

router.put("/api/users/update-user", bodyParser.json(), async (req, res) => {
  const { user } = req.body;
  const { _id } = user;

  try {
    const result = await db.User.findByIdAndUpdate(_id, user, { new: true });
    res.status(200).json({ user: result });
  } catch (e) {
    console.log("\n error in updating user = ", e, "\n\n");
    res.status(400).json({ error: e });
  }
});

module.exports = router;
