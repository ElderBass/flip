import React from 'react';
import styles from './ActionCard.module.css';

const backgroundsMap = {
    create: 'green',
    stats: 'blue',
    browse: 'purple',
};

const ActionCard = ({ title, onClick }) => {
    const backgroundClass = backgroundsMap[title.toLowerCase()];

    return (
        <div onClick={onClick} className={`${styles.actionCard} ${styles[backgroundClass]}`}>
            <div className={styles.header}>
                <div className={styles.spacer} />
                <hr className={styles.line} />
                <div className={styles.greyLines}>
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                </div>
                <span className={styles.text}>{title}</span>
            </div>
        </div>
    );
};

export default ActionCard;
