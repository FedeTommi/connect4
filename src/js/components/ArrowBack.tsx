import React from "react"
import { createUseStyles } from "react-jss"
import { useHistory } from "react-router-dom"

import ArrowBackIcon from "../../svg/arrow-back.svg"

const useStyles = createUseStyles({
	back: {
		position: "absolute",
		top: 10,
		right: 10,
		width: 90,
		height: 90,
		cursor: "pointer",
	},
})

const ArrowBack: React.FC<{}> = () => {
	const classes = useStyles()
	const history = useHistory()

	return (
		<ArrowBackIcon className={classes.back} onClick={() => history.goBack()} />
	)
}

export default ArrowBack
