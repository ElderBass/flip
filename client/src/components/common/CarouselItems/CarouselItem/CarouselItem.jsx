import React from 'react';
import styles from './CarouselItem.module.css';

const CarouselItem = ({ onClick, label, classes = null }) => {
    const classesObject = classes || styles;

    return (
        <div title={label} onClick={onClick} className={classesObject.container}>
            <hr className={classesObject.line} />
            <div className={classesObject.label}>{label}</div>
        </div>
    );
};

export default CarouselItem;
