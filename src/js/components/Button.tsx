import React from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	root: {
		background: "#1D7775",
		borderRadius: 5,
		color: "#eee",
		outline: "none",
		border: "none",
		fontFamily: '"Bubblegum Sans", cursive',
		textDecoration: "none",
		fontSize: 25,
		padding: "8px 16px",
		display: "block",
		textAlign: "center",
		position: "relative",
		overflow: "hidden",
		cursor: "pointer",
		zIndex: 1,
		transition: "transform 0.25s ease-out",
		"&:hover": {
			transform: "scale(1.05)",
		},
		"&:focus": {
			textDecoration: "underline",
		},
	},
	triangle: {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		position: "absolute",
		zIndex: -1,
		background: "#155755",
		clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
	},
})

type ButtonProps = {
	Component?: keyof JSX.IntrinsicElements | React.ComponentType<any>
	children: React.ReactNode
	className?: string
	[x: string]: any
}
const Button = ({
	Component = "button",
	children,
	className,
	...rest
}: ButtonProps) => {
	const classes = useStyles()

	return (
		<Component className={`${classes.root} ${className}`} {...rest}>
			<div className={classes.triangle} />
			{children}
		</Component>
	)
}

export default Button
