import React from 'react';
import styles from './AddedCards.module.css';

const AddedCards = ({ onClick, isStudy, cards }) => {
    const header = isStudy ? 'Cards to Study:' : 'Cards in Deck:';

    return (
        <div className={styles.addedCardsContainer}>
            <h3 className={styles.addedCardsHeader}>{header}</h3>
            <hr className={styles.line} />
            <div className={styles.addedCards}>
                {cards.length
                    ? cards.map((card) => (
                          <div
                              role="button"
                              key={card.id}
                              className={styles.addedCard}
                              onClick={() => onClick(card)}
                              disabled={isStudy}
                          >
                              <p className={styles.addedCardLabel}>{card.front}</p>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default AddedCards;
