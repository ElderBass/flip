export const mapStudyCards = (cards) => {
    cards.map((card, i) => {
        const mappedCard = {
            index: i,
            front: card.front,
            back: card.back,
        };
        return mappedCard;
    });
};
