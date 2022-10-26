const mongoose = require('mongoose');
const Card = require('./Card')

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    deckName: {
        type: String,
        required: true,
    },
    cards: {
        type: [Card],
        required: true
    },
    favorites: {
        type: Number,
    },
    userId: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true
    }
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
