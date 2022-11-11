import React from 'react';
import { trimEmail } from '../../../../utils/helpers/emailHelpers';
import styles from './Following.module.css';

const Following = ({ item }) => {
    return (
        <div className={styles.userCarouselItem}>
            {trimEmail(item.email)}
        </div>
    );
};

export default Following;
