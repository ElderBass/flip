import React from 'react';
import { FallingLines } from 'react-loader-spinner';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.loadingScreen}>
            <div className={styles.loadingWrapper}>
                <FallingLines width="200" visible={true} color="rgb(81, 128, 248)" />
                <FallingLines width="200" visible={true} color="rgb(81, 128, 248)" />
                <FallingLines width="200" visible={true} color="rgb(81, 128, 248)" />
            </div>
        </div>
    );
};

export default LoadingScreen;
