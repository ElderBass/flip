const uuid = require('uuid');
const mongoose = require('mongoose');
const db = require('../models');
const { ObjectId } = require('bson');
require('dotenv').config();

const uuidv4 = uuid.v4;

const MONGO_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGO_URI, { useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch((err) =>
        console.log('\n error connecting to DB in seed file = ', err, '\n')
    );

// const geraltId = new ObjectId("507f1f77bcf86cd799439011");
// const ciriId = new ObjectId("507f1f77bcf86cd799439012");
// const yenId = new ObjectId("507f1f77bcf86cd799439013");
const dandelionId = new ObjectId('507f1f77bcf86cd799439014');

const users = [
    // {
    //   _id: geraltId,
    //   email: "whitewolf@gmail.com",
    //   password: "whitewolf",
    //   favorites: [],
    //   followers: [],
    //   following: [],
    // },
    // {
    //   _id: ciriId,
    //   email: "zireael@gmail.com",
    //   password: "zireael",
    //   favorites: [],
    //   followers: [],
    //   following: [],
    // },
    // {
    //   _id: yenId,
    //   email: "yen_of_ven@gmail.com",
    //   password: "yenna",
    //   favorites: [],
    //   followers: [],
    //   following: [],
    // },
    {
        _id: dandelionId,
        email: 'dandy_lion@gmail.com',
        password: 'dandelion',
        favorites: [],
        followers: [],
        following: [],
    },
];

const decks = [
    // {
    //   deckName: "Witchers",
    //   cards: [
    //     { front: "Eskel", back: "Ya boy", id: uuidv4() },
    //     { front: "Vesimir", back: "The old man", id: uuidv4() },
    //     { front: "Lambert", back: "total dick", id: uuidv4() },
    //     { front: "Ciri", back: "My girl", id: uuidv4() },
    //   ],
    //   favorites: 10,
    //   author: "whitewolf",
    //   userId: geraltId,
    //   timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
    // },
    // {
    //   deckName: "My friends",
    //   cards: [
    //     { front: "Eskel", back: "Ya boy", id: uuidv4() },
    //     { front: "Vesimir", back: "The old man", id: uuidv4() },
    //     {
    //       front: "Dandelion",
    //       back: "Actually named Yaskier...? But he has a great voice",
    //       id: new uuidv4(),
    //     },
    //     { front: "Kelpie", back: "My fav horse", id: uuidv4() },
    //   ],
    //   favorites: 8,
    //   userId: ciriId,
    //   author: "zireael",
    //   timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
    // },
    // {
    //   deckName: "Sorceresses",
    //   cards: [
    //     { front: "Triss", back: "Little sis", id: uuidv4() },
    //     {
    //       front: "Fringilla Vigo",
    //       back: "Poor girl whose heart Geralt toyed with",
    //       id: uuidv4(),
    //     },
    //     {
    //       front: "Phillipa Eilheart",
    //       back: "Conniving, scheming, bitch",
    //       id: uuidv4(),
    //     },
    //     { front: "Sabrina Glevissig", back: "She aight", id: uuidv4() },
    //   ],
    //   favorites: 5,
    //   userId: yenId,
    //   author: "yen_of_ven",
    //   timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
    // },
    {
        deckName: 'Ballads',
        cards: [
            {
                front: 'The Last Wish',
                back: 'Love story between Yen and Geralt',
                id: uuidv4(),
            },
            {
                front: 'Sword of Destiny',
                back: "Where my girl Ciri becomes Geralt's squire/daughter",
                id: uuidv4(),
            },
            {
                front: 'The Lesser Evil',
                back: 'An inagural tale where Geralit becomes the Butcher of Blaviken',
                id: uuidv4(),
            },
            {
                front: 'The Edge of the World',
                back: 'Where Geralt and I travel to the bounds of the earth and uncover the mischief of a sylvan',
                id: uuidv4(),
            },
        ],
        favorites: 5,
        userId: dandelionId,
        author: 'dandy_lion',
        timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
    },
];

const deleteData = async () => {
    try {
        await db.User.deleteMany();
        console.log('Data deleted');
    } catch (err) {
        console.log('\n \n error deleting data = ', err, '\n \n ');
    }
};

const seedUser = async (user) => {
    let id;
    try {
        // await deleteData();
        const result = await db.User.create(user);
        console.log('\n result in adding user? ', result, '\n\n');
        const { _id } = result;
        id = _id;
        process.exit();
    } catch (err) {
        console.log('\n \n error in seedUsers - ', err, '\n \n');
    }
    return id;
};

const seedDeck = async (deck) => {
    try {
        // await deleteData();
        await db.Deck.create(deck);
        process.exit();
    } catch (err) {
        console.log('\n \n error in seedDecks - ', err, '\n \n');
    }
};

users.forEach(async (user) => {
    await seedUser(user);
});

decks.forEach(async (deck) => {
    await seedDeck(deck);
});
