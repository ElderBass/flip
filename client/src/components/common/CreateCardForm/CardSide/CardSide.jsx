import React, { useRef, useEffect } from "react";
import { SIDES } from "../../../../utils/constants";
import styles from "./CardSide.module.css";

const CardSide = ({ value, onChange, onFlip, side, onSubmit }) => {
	const id = side.toLowerCase();
	const frontRef = useRef();
	const backRef = useRef();

	useEffect(() => {
		// TODO: Figure out why this isn't focusing
		if (side === SIDES.FRONT) {
			setTimeout(() => {
				frontRef.current.focus();
			}, 5);
		} else {
			setTimeout(() => {
				backRef.current.focus();
			}, 5);
		}
	}, [side]);

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (side === SIDES.FRONT) {
				onFlip();
			} else if (side === SIDES.BACK) {
				onSubmit(e);
			}
		}
	};

	return (
		<div className={styles.cardSide}>
			<div className={styles.inputField}>
				<label className={styles.label} htmlFor={id}>
					{side}
				</label>
				{side === SIDES.FRONT ? (
					<input
						ref={frontRef}
						id={id}
						className={`${styles.input} ${styles.frontInput}`}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						onKeyDown={onKeyDown}
					/>
				) : (
					<textarea
						ref={backRef}
						id={id}
						className={`${styles.input} ${styles.backInput}`}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						onKeyDown={onKeyDown}
					/>
				)}
			</div>
			<button
				className={styles.flipCardBtn}
				type="button"
				onClick={onFlip}
			>
				-Flip-
			</button>
		</div>
	);
};

export default CardSide;
