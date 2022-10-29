//const config = require("../config/dbconfig");
const db = require("../models");

const deckController = {
  getAllDecks: function (req, res) {
    db.Deck.find()
      .sort({ timestamp: -1 })
      .then((dbModel) => {
        res.json({ posts: dbModel, isSuccess: true });
      })
      .catch((err) => res.status(422).json({ isSuccess: false, error: err }));
  },
  createDeck: async function (req, res) {
    const { body } = req;
    try {
      const result = await db.Deck.create(body);
      console.log("\n \n result inside create deck controller ", result, "\n");
      res.json({ postData: result, isSuccess: true });
    } catch (err) {
      console.log("\n \n err inside create deck controller ", err, "\n");
      res.status(422).json({ error: err, isSuccess: false });
    }
  },
};

module.exports = deckController;
