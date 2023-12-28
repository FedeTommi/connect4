import React from "react"
import { createUseStyles } from "react-jss"
import { Link } from "react-router-dom"

import Button from "./components/Button"
import YellowTokenSmiley from "../svg/yellow-token-smiley.svg"
import RedYellowTokens from "../svg/red-yellow-happy-tokens.svg"

const useStyles = createUseStyles({
	background: {
		height: "100vh",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	logoStripe: {
		height: "25vh",
		width: "100%",
		display: "flex",
		background: "#ECECEC",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		height: "75%",
	},
	buttonBox: {
		display: "flex",
		flexDirection: "column",
		padding: "30px 0",
	},
	buttonRow: {
		padding: "-50px 0",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	button: {
		width: 160,
		margin: "0 15px",
	},
	smiley2: {
		height: 100,
	},
	smiley1: {
		height: 80,
	},
})

const LandingPage: React.FC<{}> = () => {
	const classes = useStyles()

	return (
		<div className={classes.background}>
			<div className={classes.logoStripe}>
				<img
					src={require("!file-loader!../svg/logo.svg").default}
					className={classes.logo}
				/>
			</div>

			<div className={classes.buttonBox}>
				<div className={classes.buttonRow}>
					<Button
						Component={Link}
						to="/singleplayer"
						className={classes.button}
					>
						Single player
					</Button>
					<YellowTokenSmiley className={classes.smiley1} />
				</div>
				<div className={classes.buttonRow}>
					<RedYellowTokens className={classes.smiley2} />
					<Button Component={Link} to="/multiplayer" className={classes.button}>
						Multiplayer
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LandingPage
