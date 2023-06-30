import React from 'react';
import styles from './CarouselItem.module.css';

const CarouselItem = ({ onClick, label, classes = null }) => {
    const classesObject = classes || styles;

    return (
        <div title={label} onClick={onClick} className={classesObject.container}>
            <div className={classesObject.line} />
            <div className={classesObject.labelContainer}>
                <p className={classesObject.label}>{label}</p>
            </div>
        </div>
    );
};

export default CarouselItem;
