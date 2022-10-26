import styles from './App.module.css';

function App() {
  console.log(styles)
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>FLIP</h1>
    </div>
  );
}

export default App;
