const uuid = require("uuid");
const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();

const uuidv4 = uuid.v4;

const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) =>
    console.log("\n error connecting to DB in seed file = ", err, "\n")
  );

const users = [
  {
    email: "whitewolf@gmail.com",
    password: "whitewolf",
    favorites: [],
    followers: [],
    following: [],
  },
  {
    email: "zireael@gmail.com",
    password: "zireael",
    favorites: [],
    followers: [],
    following: [],
  },
  {
    email: "yen_of_ven@gmail.com",
    password: "yenna",
    favorites: [],
    followers: [],
    following: [],
  },
];
// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
const decks = [
  {
    deckName: "Witchers",
    cards: [
      { front: "Eskel", back: "Ya boy", id: uuidv4() },
      { front: "Vesimir", back: "The old man", id: uuidv4() },
      { front: "Lambert", back: "total dick", id: uuidv4() },
      { front: "Ciri", back: "My girl", id: uuidv4() },
    ],
    favorites: 10,
    author: "whitewolf",
    timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
  },
  {
    deckName: "My friends",
    cards: [
      { front: "Eskel", back: "Ya boy", id: uuidv4() },
      { front: "Vesimir", back: "The old man", id: uuidv4() },
      {
        front: "Dandelion",
        back: "Actually named Yaskier...? But he has a great voice",
        id: new uuidv4(),
      },
      { front: "Kelpie", back: "My fav horse", id: uuidv4() },
    ],
    favorites: 8,
    author: "zireael",
    timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
  },
  {
    deckName: "Sorceresses",
    cards: [
      { front: "Triss", back: "Little sis", id: uuidv4() },
      {
        front: "Fringilla Vigo",
        back: "Poor girl whose heart Geralt toyed with",
        id: uuidv4(),
      },
      {
        front: "Phillipa Eilheart",
        back: "Conniving, scheming, bitch",
        id: uuidv4(),
      },
      { front: "Sabrina Glevissig", back: "She aight", id: uuidv4() },
    ],
    favorites: 5,
    author: "yen_of_ven",
    timestamp: new Date(2020, 11, 11, 15, 37, 42, 0),
  },
];

const deleteData = async () => {
  try {
    await db.User.deleteMany();
    console.log("Data deleted");
  } catch (err) {
    console.log("\n \n error deleting data = ", err, "\n \n ");
  }
};

const seedUser = async (user) => {
  let id;
  try {
    // await deleteData();
    const result = await db.User.create(user);
    console.log("\n result in adding user? ", result, "\n\n");
    const { _id } = result;
    id = _id;
    process.exit();
  } catch (err) {
    console.log("\n \n error in seedUsers - ", err, "\n \n");
  }
  return id;
};

const seedDeck = async (deck) => {
  try {
    // await deleteData();
    await db.Deck.create(deck);
    process.exit();
  } catch (err) {
    console.log("\n \n error in seedDecks - ", err, "\n \n");
  }
};

const seedGeralt = async () => {
  try {
    const geralt = await seedUser(users[0]);
    console.log("\n geralt??", geralt, "\n\n");
    const { _id } = geralt;
    const newDeck = decks[0];
    newDeck.userId = _id;
    await seedDeck(newDeck);
  } catch (e) {
    console.log("\n error in seeding geralt = ", e, "\n\n");
  }
};

users.forEach(async (user, i) => {
  const userId = await seedUser(user);
  const newDeck = decks[i];
  newDeck.userId = userId;
  await seedDeck(newDeck);
});
