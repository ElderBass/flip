const router = require('express').Router();
const deckRoutes = require('./deck');
const userRoutes = require('./user');

router.use('/decks', deckRoutes);
router.use('/users', userRoutes);

module.exports = router;
