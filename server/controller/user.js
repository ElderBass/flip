const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/db-config");

module.exports = {
  addUser: function (req, res) {
    const { body } = req;
    console.log("\n \n req body inside add user ", body, "\n \n");
    db.User.create(body)
      .then((dbModel) => {
        console.log("\n \n response in add user = ", dbModel, "\n \n");
        res.json({ user: dbModel, isSuccess: true });
      })
      .catch((err) => res.status(422).json({ isSuccess: false, error: err }));
  },
  loginUser: function (req, res) {
    db.User.findOne({
      email: req.body.email,
    }).exec(async (err, user) => {
      try {
        if (err) {
          console.log("\n \n err inside login user controller ", err, "\n \n");
          res.status(500).send({ isSuccess: false, error: err });
          return;
        }

        if (!user) {
          return res
            .status(404)
            .json({ error: "User Not found.", isSuccess: false });
        }

        let passwordIsValid = await user.validatePassword(req.body.password);

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
  },
  getOneUser: async function (req, res) {
    const { id } = req.query;
    try {
      const result = await db.User.findOne({ _id: id });
      console.log("\n \n result inside get one user", result, "\n \n ");
      // validate result here
    } catch (err) {
      console.log("\n\n err inside get one user controller", err, "\n \n");
    }
  },
};
