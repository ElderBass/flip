const router = require("express").Router();
const bodyParser = require("body-parser");
const { Deck } = require("../models");

router.post('/api/decks/create', bodyParser.json(), async (req, res) => {
  const { body } = req;
  try {
    const result = await Deck.create(body);
    console.log("\n \n result inside create deck controller ", result, "\n");
    res.json({ data: result, isSuccess: true });
  } catch (e) {
    console.log('\n\n err inside create deck route = ', e, '\n\n');
    res.status(400).send({ isSuccess: false, error: e });
  }
});

router.get('/api/decks/all', async (req, res) => {
  const { body: { userId } } = req;
  try {
    const response = await Deck.find({ userId }).sort({ timestamp: -1 });
    console.log("\n \n response from getting all decks ", response, "\n");
    res.json({ decks: response, isSuccess: true });
  } catch (e) {
    console.log("\n \n error when getting all decks ", e, "\n");
    res.status(400).send({ isSucces: false, error: e });
  }
});

router.put('/api/decks/edit-favorites', async (req, res) => {
  const { favorites, deckId } = req.body;
  console.log('\n favors in edit-favs ? ', favorites, '\n\n');
  try {
    const response = await Deck.findOneAndUpdate({ _id: deckId }, { favorites });
    console.log("\n \n response from editing favs for a deck ", response, "\n");
  } catch (e) {
    console.log('\n error in editing number of favs for a deck = ', e, '\n\n');
    res.status(400).send({ isSuccess: false, error: e });
  }
});

module.exports = router;
