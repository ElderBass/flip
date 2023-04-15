import React from 'react';
import styles from './CarouselItem.module.css';

const CarouselItem = ({ onClick, label, customClass = '' }) => {
    const classes = `${styles.carouselItem} ${customClass}`;
    return (
        <div title={label} onClick={onClick} className={classes}>
            <hr className={styles.line} />
            <div className={styles.label}>
                {label}
            </div>
        </div>
    );
};

export default CarouselItem;
