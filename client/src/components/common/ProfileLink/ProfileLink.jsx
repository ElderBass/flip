import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileLink.module.css";

const ProfileLink = () => {
	return (
		<li>
			<Link className={`link ${styles.profileLink}`} to="/home">
				Profile
			</Link>
		</li>
	);
};

export default ProfileLink;
