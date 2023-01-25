import React from 'react';
import BrowsePageContent from '../../common/BrowsePageContent';
import Header from '../../common/Header/Header';
import styles from './Browse.module.css';

const Browse = () => {
    return (
        <div className={styles.browsePage}>
            <Header />
            <BrowsePageContent />
        </div>
    );
};

export default Browse;
