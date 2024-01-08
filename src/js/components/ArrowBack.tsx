import React from "react"
import { createUseStyles } from "react-jss"
import { useNavigate } from "react-router-dom"

import ArrowBackIcon from "../../svg/arrow-back.svg"

const useStyles = createUseStyles({
	back: {
		position: "absolute",
		top: 10,
		right: 10,
		width: 90,
		height: 90,
		cursor: "pointer",
		outline: "none",
		border: "none",
		"&:focus > path:first-child, &:focus-visible > path:first-child": {
			fill: "#155755",
		},
	},
})

const ArrowBack: React.FC<{}> = () => {
	const classes = useStyles()
	const navigate = useNavigate()

	return (
		<ArrowBackIcon
			className={classes.back}
			tabIndex={0}
			onClick={() => navigate(-1)}
		/>
	)
}

export default ArrowBack
