import React, { CSSProperties, Fragment, useCallback, useState } from "react"
import { createUseStyles } from "react-jss"
import Modal from "react-modal"
import { Link } from "react-router-dom"

import MFLogo from "../../svg/maple-pizza-logo.svg"

const useStyles = createUseStyles({
	maplePizza: {
		width: 90,
		position: "fixed",
		left: 10,
		bottom: 10,
		cursor: "pointer",
	},
	nameLinkedid: {
		fontFamily: '"Bubblegum Sans", cursive',
		fontSize: 25,
		textDecoration: "none",
		color: "var(--tiffany-extra-dark)",
		margin: 5,
	},
	textInModal: {
		fontFamily: '"Bubblegum Sans", cursive',
		fontSize: 20,
		color: "#999595",
	},
})

const modalContentStyles: CSSProperties = {
	background: "white",
	borderRadius: 5,
	padding: 10,
	position: "fixed",
	top: "auto",
	right: "auto",
	left: 10,
	bottom: 100,
	display: "flex",
	flexDirection: "column",
	textAlign: "center",
	boxShadow: "0px 1px 2px #0006",
	borderColor: "transparent",
}

const modalOverlayStyles: CSSProperties = {
	zIndex: 1,
	backgroundColor: "transparent",
}

const LogoPopup = () => {
	const [isOpen, setIsOpen] = useState(false)
	const classes = useStyles()

	const open = useCallback(() => setIsOpen(true), [])
	const close = useCallback(() => setIsOpen(false), [])

	return (
		<Fragment>
			<MFLogo className={classes.maplePizza} onClick={open} />
			<Modal
				isOpen={isOpen}
				style={{ overlay: modalOverlayStyles, content: modalContentStyles }}
				onRequestClose={close}
			>
				<div className={classes.textInModal}>Created by:</div>
				<a
					className={classes.nameLinkedid}
					href="http://linkedin.com/in/marcel-robitaille"
				>
					Marcellino
				</a>
				<div className={classes.textInModal}>&</div>
				<Link
					className={classes.nameLinkedid}
					to="/fede"
					// Fede's linkedin:
					// href='http://www.linkedin.com/in/federica-tomola-44124a184/'>
				>
					Federchicca
				</Link>
			</Modal>
		</Fragment>
	)
}

export default LogoPopup
