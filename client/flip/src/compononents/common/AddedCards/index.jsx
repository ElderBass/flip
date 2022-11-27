import React from 'react';
import styles from './AddedCards.module.css';

const AddedCards = ({ cards, onClick }) => {
    return (
        <div className={styles.addedCardsContainer}>
            <h3 className={styles.addedCardsHeader}>Cards in Deck:</h3>
            <hr className={styles.line} />
            <div className={styles.addedCards}>
                {cards.length
                    ? cards.map((card) => (
                          <div
                              key={card.id}
                              className={styles.addedCard}
                              onClick={() => onClick(card)}
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
