import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	root: {
		background: "grey", //#fea #E7B55F #c87137
		borderRadius: 5,
		width: "100%",
		color: "#eee",
		outline: "none",
		border: "none",
		fontFamily: '"Bubblegum Sans", cursive',
		textDecoration: "none",
		fontSize: 26,
		padding: "12px 20px",
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
		"&:focus, &:focus-visible": {
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
		background: "#a3a3a3", //#E7B55F #c87137 #A05A2C
		clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
	},
	radio: {
		opacity: 0,
		position: "absolute",
		"&:not(:checked) ~div": {
			background: "#a3a3a3",
		},
	},
})

type RadioButtonProps = {
	classes: Record<string, string>
	children: React.ReactNode
	className: string
	name: string
	defaultChecked?: boolean
}

const Radiobutton: React.FC<RadioButtonProps> = ({
	classes: givenClasses = {},
	children,
	className,
	name,
	defaultChecked,
	...rest
}) => {
	const classes = useStyles()

	return (
		<label className={classNames(classes.root, className)} {...rest}>
			<input
				type="radio"
				className={classes.radio}
				name={name}
				defaultChecked={defaultChecked}
			/>
			<div className={classNames(classes.triangle, givenClasses.triangle)} />
			{children}
		</label>
	)
}

export default Radiobutton
