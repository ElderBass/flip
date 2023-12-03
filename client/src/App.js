import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import AuthRoute from "./components/common/AuthRoute";
import Logout from "./components/views/Logout";
import Home from "./components/views/Home";
import CreateDeck from "./components/views/CreateDeck";
import Deck from "./components/views/Deck";
import Study from "./components/views/Study";
import Browse from "./components/views/Browse";
import Landing from "./components/views/Landing";
import UserPage from "./components/views/UserPage";
import FourOhFourPage from "./components/views/FourOhFourPage";
import Stats from "./components/views/Stats";
import styles from "./App.module.css";
import Chat from "./components/views/Chat";

function App() {
	const ComponentMap = {
		Home,
		Landing,
		FourOhFourPage,
	};

	const {
		user: { isLoggedIn },
	} = store.getState();

	const [CatchAllPage, setCatchAllPage] = useState(null);

	// TODO: Is this the best way to do this? Can't I just take a pure Route approach?
	useEffect(() => {
		const path = window.location.pathname;
		if (path === "/") {
			if (isLoggedIn) {
				setCatchAllPage("Home");
			} else {
				setCatchAllPage("Landing");
			}
		} else {
			setCatchAllPage("FourOhFourPage");
		}
	}, [isLoggedIn]);

	return (
		<Router>
			<div className={styles.mainContainer}>
				<Switch>
					<AuthRoute exact path="/home" component={Home} />
					<AuthRoute path="/user/:userId" component={UserPage} />
					<AuthRoute
						exact
						path="/create-deck"
						component={CreateDeck}
					/>
					<AuthRoute exact path="/edit-deck" component={CreateDeck} />
					<AuthRoute exact path="/study" component={Study} />
					<AuthRoute exact path="/deck" component={Deck} />
					<AuthRoute exact path="/stats" component={Stats} />
					<AuthRoute exact path="/browse" component={Browse} />
					<AuthRoute exact path="/chat" component={Chat} />
					<AuthRoute exact path="/logout" component={Logout} />
					<Route exact path="/landing" component={Landing} />
					<Route component={ComponentMap[CatchAllPage]} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
