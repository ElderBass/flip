const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    deckName: {
        type: String,
        required: true,
    },
    cards: {
        type: Array,
        required: true
    },
    favorites: {
        type: Number,
    },
    userId: {
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
