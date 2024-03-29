const router = require('express').Router();
const deckRoutes = require('./deck');
const userRoutes = require('./user');

router.use('/decks', deckRoutes);
router.use('/users', userRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
