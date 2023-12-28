import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

import { NUM_ROWS } from "./GameConstants"

const useStyles = createUseStyles({
	token: {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		borderRadius: "50%",
		position: "absolute",
		zIndex: -1,
	},

	P2: {
		backgroundColor: "var(--p2-color)",
	},

	P1: {
		backgroundColor: "var(--p1-color)",
	},
})

// pixels / s / s
const GRAVITY = 800

type TokenProps = {
	y: number
	player: "P1" | "P2"
}

const Token: React.FC<TokenProps> = ({ player, y }) => {
	const classes = useStyles()
	const tokenRef = React.createRef<HTMLDivElement>()

	useEffect(() => {
		if (!tokenRef.current) {
			return
		}

		const distanceToOffset =
			(NUM_ROWS - y) * tokenRef.current.getBoundingClientRect().height + 10

		tokenRef.current.animate(
			[
				{ transform: `translateY(${-distanceToOffset}px)` },
				{ transform: "translateY(0)" },
			],
			{
				duration: Math.sqrt((2 * distanceToOffset) / GRAVITY) * 1000,
				easing: "ease-in",
			},
		)
	}, [])

	return (
		<div ref={tokenRef} className={`${classes.token} ${classes[player]}`} />
	)
}

export default Token
