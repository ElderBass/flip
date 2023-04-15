const router = require("express").Router();
const bodyParser = require("body-parser");
const { Deck } = require("../models");

router.post("/api/decks/create", bodyParser.json(), async (req, res) => {
  const { body } = req;
  try {
    const result = await Deck.create(body);
    console.log("\n \n result inside create deck controller ", result, "\n");
    res.json({ data: result, isSuccess: true });
  } catch (e) {
    console.log("\n\n err inside create deck route = ", e, "\n\n");
    res.status(400).send({ isSuccess: false, error: e });
  }
});

router.get("/api/decks/all", async (req, res) => {
  const {
    body: { userId },
  } = req;
  try {
    const response = await Deck.find().sort({ timestamp: -1 });
    console.log("\n \n response from getting all decks ", response, "\n");
    res.json({ decks: response, isSuccess: true });
  } catch (e) {
    console.log("\n \n error when getting all decks ", e, "\n");
    res.status(400).send({ isSucces: false, error: e });
  }
});

router.get("/api/decks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Deck.findOne({ _id: id });
    console.log("\n \n response from getting ONE deck ", response, "\n");
    res.status(200).json({ deck: response, isSuccess: true });
  } catch (e) {
    console.log("\n \n error when getting all decks ", e, "\n");
    res.status(400).send({ isSucces: false, error: e });
  }
});

router.get("/api/decks/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Deck.find({ userId: id }).sort({ timestamp: -1 });
    console.log("\n \n response from getting all user decks ", response, "\n");
    res.json({ decks: response, isSuccess: true });
  } catch (e) {
    console.log("\n \n error when getting all user decks ", e, "\n");
    res.status(400).send({ isSucces: false, error: e });
  }
});

router.put("/api/decks/edit-favorites", async (req, res) => {
  const { favorites, deckId } = req.body;
  try {
    const response = await Deck.findOneAndUpdate(
      { _id: deckId },
      { favorites },
      { returnDocument: true }
    );
    console.log("\n \n response from editing favs for a deck ", response, "\n");
    res.status(200).json(response);
  } catch (e) {
    console.log("\n error in editing number of favs for a deck = ", e, "\n\n");
    res.status(400).send({ isSuccess: false, error: e });
  }
});

router.delete("/api/decks/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Deck.findByIdAndDelete(id);
    res.status(200).send();
  } catch (e) {
    console.log("\n error in trying to delete one deck = ", e, "\n\n");
    res.status(400).send({ error: e });
  }
});

module.exports = router;
