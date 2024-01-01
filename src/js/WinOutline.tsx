import React from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	root: {
		height: 0,
		bottom: 0,
		width: "100%",
		position: "absolute",
		transformOrigin: "25px calc(100% - 25px)",
		border: "2px solid #eee",
		zIndex: 1,
	},
})

type WinOutlineProps = {
	rotation: number
	length: number
	origin: {
		x: number
		y: number
	}
}

const WinOutline: React.FC<WinOutlineProps> = ({
	rotation,
	length,
	origin,
}) => {
	const classes = useStyles()
	const aspectRatio =
		1 +
		(length - 1) * (Math.abs(Math.sin(rotation)) + Math.abs(Math.cos(rotation)))

	return (
		<div
			className={classes.root}
			style={{
				transform: `translate(${origin.x * 50}px, -${
					50 * origin.y
				}px) rotate(${rotation}rad)`,
				borderRadius: `100% / ${100 / aspectRatio}%`,
				paddingBottom: `calc(${100 * aspectRatio}% - 4px)`,
			}}
		/>
	)
}

export default WinOutline
