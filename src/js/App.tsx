import React from "react"
import { createUseStyles } from "react-jss"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import Modal from "react-modal"

import LandingPage from "./LandingPage"
import MultiPlayerPage from "./MultiPlayerPage"
import SinglePlayerPage from "./SinglePlayerPage"
import GamePage from "./GamePage"
import LogoPopup from "./components/LogoPopup"
import backgroundPath from "!file-loader!../svg/abstract_background.svg"

Modal.setAppElement("#react-root")

const useStyles = createUseStyles({
	background: {
		backgroundImage: `url(${backgroundPath})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		overflowY: "auto",
	},
})

const App: React.FC<{}> = () => {
	const classes = useStyles()

	return (
		<div className={classes.background}>
			<Router>
				<LogoPopup />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/multiplayer" element={<MultiPlayerPage />} />
					<Route path="/singleplayer" element={<SinglePlayerPage />} />
					<Route path="/game" element={<GamePage />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
