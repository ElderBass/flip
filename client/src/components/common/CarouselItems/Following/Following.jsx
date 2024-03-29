import React from "react";
import { Link } from "react-router-dom";
import { trimEmail } from "../../../../utils/helpers/emailHelpers";
import CarouselItem from "../CarouselItem";

const Following = ({ item, classes }) => {
	return (
		<Link className="link" to={`/user/${item._id}`}>
			<CarouselItem
				onClick={() => {}}
				label={trimEmail(item.email)}
				classes={classes}
			/>
		</Link>
	);
};

export default Following;
