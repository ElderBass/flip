import React from 'react';
import styles from './CarouselItem.module.css';

const CarouselItem = ({ onClick, label }) => {
    return (
        <div onClick={onClick} className={styles.carouselItem}>
            <hr className={styles.line} />
            <div className={styles.label}>
                {label}
            </div>
        </div>
    );
};

export default CarouselItem;
