import React from "react";
import { Link } from "react-router-dom";
import styles from "./Stats.module.css";

const Stats = () => {
	return (
		<div className={styles.statsPage}>
			<div className={styles.actions}>
				<h1 className={styles.statsHeader}>Psyche!</h1>
				<h3 className={styles.statsBody}>
					This page isn't finished...yet...
				</h3>
				<h4 className={styles.statsHeadingForNow}>
					Keep Flipping and soon enough that lazy bum, Seth, will have
					finished this page!
				</h4>
				<Link className={`link ${styles.back2Home}`} to="/home">
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default Stats;
