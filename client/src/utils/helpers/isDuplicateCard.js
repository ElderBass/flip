export const isDuplicateCard = (front, deck) => {
    return deck.filter((card) => card.front === front).length;
};
