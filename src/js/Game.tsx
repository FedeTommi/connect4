import React, { CSSProperties, Fragment } from "react"
import Modal from "react-modal"
import withStyles from "react-jss"
import { Link } from "react-router-dom"
import classNames from "classnames"

import * as logic from "./GameLogic"
import GameBoard from "./GameBoard"
import Button from "./components/Button"
import Timer from "./components/Timer"
import Logo from "../svg/logo.svg"
import { NUM_COLUMNS, NUM_ROWS, PLAYERS } from "./GameConstants"
import { Grid, WinSequences } from "./GameLogic"
import Star from "../svg/star.svg"
import Boop from "./components/Boop"

const styles = {
	background: {
		// background: '#EEEEEE',
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",

		// zIndex: -1,
	},
	wrapper: {
		width: 380,
		justifyContent: "center",
		display: "inline-block",
		background: "#EEEEEE",
		boxShadow: "0px 1px 2px #0006",
		borderRadius: 5,
		padding: 10,
	},
	logo: {
		boxSizing: "border-box",
		width: "100%",
		marginTop: 20,
		marginBottom: 30,
	},
	pauseButton: {
		position: "absolute",
		left: 0,
		top: 0,
		margin: 20,
		fontWeight: "bold",
		fontSize: 35,
	},
	button: {
		margin: 5,
		fontSize: 30,
	},
	winModalHeader: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "2px 10px",
		borderRadius: 5,
		position: "relative",
		backgroundColor: "rgba(255,255,255,0.4)",
		boxShadow: "2px 2px 4px grey",
		margin: 10,
		// height: 50,
		fontSize: 30,
		cursor: "text",
		fontFamily: "Bubblegum Sans",
		gap: "5px",
	},
	winModalScores: {
		fontSize: 20,
		cursor: "text",
		fontFamily: "Bubblegum Sans",
		textAlign: "center",
		display: "flex",
		gap: "10px",
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "center",
	},
	turnField: {
		background: "white",
		display: "flex",
		flexDirection: "row",
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		// boxShadow: '2px 2px 4px grey',
		// boxShadow: '0px 1px 2px #0006',
		justifyContent: "space-between",
		alignItems: "center",

		"& > span": {
			fontFamily: "Bubblegum Sans, cursive",
			fontSize: 30,
			/* font-weight: 400, */
			margin: 10,
			textShadow: "0px 1px 2px #0009",
		},
	},
	player1: {
		color: "var(--p1-color)",
		flex: 1,
	},
	player2: {
		color: "var(--p2-color)",
		flex: 1,
		textAlign: "right",
	},
	activePlayer: {
		outline: "5px solid #b0e0df",
	},
	score: {
		width: "40%",
	},
	scoreLeft: {
		textAlign: "end",
	},
	scoreRight: {
		textAlign: "start",
	},
	star: {
		width: 40,
		height: 40,
	},
}

const pauseModalStyles = {
	content: {
		display: "flex",
		flexDirection: "column",
		position: "relative",
		inset: 0,
		padding: "20px 80px",
	} satisfies CSSProperties,
	overlay: {
		background: "#0004",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	} satisfies CSSProperties,
}

const winModalStyles = {
	content: {
		padding: 5,
		display: "flex",
		flexDirection: "column",
		position: "relative",
		inset: 0,
		alignSelf: "center",
	} satisfies CSSProperties,
	overlay: {
		// background: 'var(--tiffany-extra-dark)',
		background: "#0009",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
		zIndex: 1,
		paddingTop: 10,
	} satisfies CSSProperties,
}

type GameProps = {
	players: { P1: string; P2: string }
	onPlaceToken: (x: number) => any
	multiplayerCode: string | null
	classes: Record<string, string>
}

type GameState = {
	scores: { P1: number; P2: number }
	isPaused: boolean
	turnCounter: number
	grid: Grid
	winningPlayerID: "P1" | "P2" | null
	winSequences: WinSequences
}

class Game extends React.Component<GameProps, GameState> {
	state = {
		scores: { P1: 0, P2: 0 },
		...this.defaultState(),
	}

	defaultState() {
		return {
			isPaused: false,
			turnCounter: 0,
			grid: Array.from(Array(NUM_COLUMNS), () =>
				new Array(NUM_ROWS).fill(null),
			),
			winSequences: [],
			winningPlayerID: null,
		}
	}

	handlePause = () => {
		this.setState({ isPaused: true })
	}

	handleResume = () => {
		this.setState({ isPaused: false })
	}

	get activePlayer() {
		return PLAYERS[this.state.turnCounter % 2]
	}

	placeTokenAtX = (x: number) => {
		const y = this.state.grid[x].indexOf(null)

		// Ignore if column already full
		// Bail early, don't count as turn
		if (y === -1) return

		const grid = this.state.grid
		grid[x][y] = this.activePlayer

		this.checkWinCondition(grid, x, y)

		this.setState({
			turnCounter: this.state.turnCounter + 1,
			grid,
		})
	}

	handleClick = (x: number) => () => {
		if (this.activePlayer === "P2") {
			return
		}
		this.placeTokenAtX(x)

		if (this.props.multiplayerCode) {
			this.props.onPlaceToken(x)
		} else {
			setTimeout(this.robMove, 2000)
		}
	}

	checkWinCondition = (grid: Grid, x: number, y: number) => {
		const winSequences = logic.checkWinCondition(grid, x, y)
		if (winSequences.length) {
			const { scores } = this.state
			scores[this.activePlayer]++
			this.setState({
				winningPlayerID: this.activePlayer,
				winSequences,
				scores,
			})
		}
	}

	robMove = () => {
		if (this.state.winningPlayerID !== null) return

		const gridCopy = JSON.parse(JSON.stringify(this.state.grid))

		// First check if Rob can win anywhere,
		// then check if he can block anywhere
		for (const player of ["P2", "P1"]) {
			for (let x = 0; x < NUM_COLUMNS; x++) {
				const y = gridCopy[x].indexOf(null)

				if (y === -1) continue

				gridCopy[x][y] = player

				if (logic.checkWinCondition(gridCopy, x, y).length) {
					this.placeTokenAtX(x)
					return
				}

				gridCopy[x][y] = null
			}
		}
		this.placeRandomToken()
	}

	placeRandomToken = () => {
		const nonFullColumns = this.state.grid
			.map((cells, i) => ({ cells, i }))
			.filter(({ cells }) => cells.includes(null))
		const randomX =
			nonFullColumns[Math.floor(Math.random() * nonFullColumns.length)].i
		this.placeTokenAtX(randomX)
	}

	handleNewGame = () => {
		this.setState({ ...this.state, ...this.defaultState() })
	}

	handleTimeout = () => {
		this.placeRandomToken()

		setTimeout(this.robMove, 2000)
	}

	render() {
		const { classes, players } = this.props
		const { winningPlayerID, winSequences, turnCounter, scores, grid } =
			this.state

		return (
			<Fragment>
				<Modal
					isOpen={this.state.isPaused}
					onRequestClose={this.handleResume}
					style={pauseModalStyles}
				>
					<Button className={classes.button} onClick={this.handleResume}>
						Resume
					</Button>
					<Button className={classes.button} Component={Link} to="/">
						Back to menu
					</Button>
				</Modal>
				<Modal
					isOpen={winningPlayerID !== null}
					onRequestClose={this.handleResume}
					style={winModalStyles}
				>
					<div className={classes.winModalHeader}>
						{players[winningPlayerID!]} won
						<Boop rotation={20} timing={200}>
								<Star className={classes.star} />
						</Boop>
					</div>
					<div className={classes.winModalScores}>
						<div className={classNames(classes.score, classes.scoreLeft)}>
							{players.P1} {scores.P1}
						</div>
						<div>:</div>
						<div className={classNames(classes.score, classes.scoreRight)}>
							{scores.P2} {players.P2}
						</div>
					</div>
					<Button className={classes.button} onClick={this.handleNewGame}>
						Play again
					</Button>
					<Button className={classes.button} Component={Link} to="/">
						Back to main menu
					</Button>
				</Modal>

				<div className={classes.background}>
					<Button className={classes.pauseButton} onClick={this.handlePause}>
						| |
					</Button>
					<div className={classes.wrapper}>
						<Logo className={classes.logo} />
						<GameBoard
							grid={grid}
							winSequences={winSequences}
							onClick={this.handleClick}
						/>
						<div className={classes.turnField}>
							<span
								className={classNames(classes.player1, {
									[classes.activePlayer]: this.activePlayer === "P1",
								})}
							>
								{players.P1}
							</span>
							<div>
								<Timer
									isPaused={this.state.isPaused || winningPlayerID !== null}
									onTimeOut={this.handleTimeout}
									turnCounter={turnCounter}
								/>
							</div>
							<span
								className={classNames(classes.player2, {
									[classes.activePlayer]: this.activePlayer === "P2",
								})}
							>
								{players.P2}
							</span>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(Game)
