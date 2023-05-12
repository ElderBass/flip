import React from 'react';
import Actions from '../../common/Actions';
import FourOhFour from '../../common/FourOhFour/FourOhFour';
import Header from '../../common/Header/Header';
import styles from './FourOhFourPage.module.css';

const FourOhFourPage = () => {
    return (
        <div className={styles.fourOhFourPage}>
            <Header />
            <div className={styles.fourOhFourContent}>
                <FourOhFour />
                <Actions />
            </div>
        </div>
    );
};

export default FourOhFourPage;
