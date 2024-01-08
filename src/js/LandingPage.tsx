import React, { useState } from "react"
import { createUseStyles } from "react-jss"
import { Link } from "react-router-dom"

import Button from "./components/Button"
import YellowTokenSmiley from "../svg/yellow_alone.svg"
import RedTokenSmiley from "../svg/red_alone.svg"
import RedYellowTokens from "../svg/red-yellow-happy-tokens.svg"
import Boop, { useBoop } from "./components/Boop"
import { animated } from "react-spring"
import classNames from "classnames"

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
		maxWidth: "100%",
	},
	buttonBox: {
		display: "flex",
		flexDirection: "column",
		padding: "30px 0",
	},
	buttonRow: {
		padding: "10px 0",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	button: {
		width: 160,
		margin: "0 15px",
	},
	smiley: {
		height: 60,
	},
	rotatedLeft: {
		transform: "rotate(-25deg)",
	},
	rotatedRight: {
		transform: "rotate(25deg)",
	},
	transformedRed: {
		transform: "rotate(25deg) ", //translate(-15px, -10px)
	},
	translatedLeft: {
		transform: "translateX(-10px)",
	},
	aboveRed: {
		zIndex: "1",
	},
	onTop: {
		zIndex: "2",
	},
	shadow: {
		marginTop: -4,
		width: 55,
		height: 7,
		alignSelf: "center",
		borderRadius: "50%",
		background: "grey",
	},
	smileyWithShadow: {
		height: 80,
		display: "flex",
		flexDirection: "column",
	},
})

const LandingPage: React.FC<{}> = () => {
	const classes = useStyles()

	const { style: styleSingle, trigger: triggerSingle } = useBoop({
		rotation: 0,
		timing: 200,
		y: -10,
		springConfig: { tension: 300, friction: 10 },
	})
	const { style: styleSingleShadow, trigger: triggerSingleShadow } = useBoop({
		rotation: 0,
		timing: 200,
		scale: 0.8,
		springConfig: { tension: 300, friction: 10 },
	})
	const { style: styleMulti1, trigger: triggerMulti1 } = useBoop({
		rotation: 0,
		timing: 200,
		y: -10,
		springConfig: { tension: 300, friction: 10 },
		delay: 100,
	})
	const { style: styleMultiShadow1, trigger: triggerMultiShadow1 } = useBoop({
		rotation: 0,
		timing: 200,
		scale: 0.8,
		springConfig: { tension: 300, friction: 10 },
		delay: 100,
	})
	const { style: styleMulti2, trigger: triggerMulti2 } = useBoop({
		rotation: 0,
		timing: 200,
		y: -10,
		springConfig: { tension: 300, friction: 10 },
	})
	const { style: styleMultiShadow2, trigger: triggerMultiShadow2 } = useBoop({
		rotation: 0,
		timing: 200,
		scale: 0.8,
		springConfig: { tension: 300, friction: 10 },
	})

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
						onMouseEnter={() => {
							triggerSingle()
							triggerSingleShadow()
						}}
					>
						Single player
					</Button>
					<div className={classes.smileyWithShadow}>
						<animated.span className={classes.onTop} style={styleSingle}>
							<YellowTokenSmiley
								className={classNames(classes.smiley, classes.rotatedRight)}
							/>
						</animated.span>
						<animated.div
							className={classes.shadow}
							style={styleSingleShadow}
						/>
					</div>
				</div>
				<div className={classes.buttonRow}>
					<div className={classes.smileyWithShadow}>
						<animated.span style={styleMulti1} className={classes.onTop}>
							<div className={classes.aboveRed}>
								<YellowTokenSmiley
									className={classNames(classes.smiley, classes.rotatedLeft)}
								/>
							</div>
						</animated.span>
						<animated.div
							className={classes.shadow}
							style={styleMultiShadow1}
						/>
					</div>
					<div
						className={classNames(
							classes.smileyWithShadow,
							classes.translatedLeft,
						)}
					>
						<animated.span style={styleMulti2} className={classes.onTop}>
							<RedTokenSmiley
								className={classNames(classes.smiley, classes.transformedRed)}
							/>
						</animated.span>
						<animated.div
							className={classes.shadow}
							style={styleMultiShadow2}
						/>
					</div>
					{/* <RedYellowTokens className={classes.smiley2} /> */}
					<Button
						Component={Link}
						to="/multiplayer"
						className={classes.button}
						onMouseEnter={() => {
							triggerMulti1()
							triggerMulti2()
							triggerMultiShadow1()
							triggerMultiShadow2()
						}}
					>
						Multiplayer
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LandingPage
