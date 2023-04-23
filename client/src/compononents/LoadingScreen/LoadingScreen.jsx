import React from 'react';
import { Audio } from 'react-loader-spinner';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.loadingScreen}>
            <Audio
                width="300"
                height="300"
                color="rgb(81, 128, 248)"
                radius="20"
            />
        </div>
    );
};

export default LoadingScreen;
