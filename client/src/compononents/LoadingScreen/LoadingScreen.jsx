import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.loadingScreen}>
            <ThreeCircles
              height="300"
              width="300"
              color="rgb(103, 145, 253)"
              visible={true}
              ariaLabel="three-circles-rotating"
            />
        </div>
    );
};

export default LoadingScreen;
