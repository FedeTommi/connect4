import React from "react"
import { createUseStyles } from "react-jss"

import Token from "./Token"
import WinOutline from "./WinOutline"
import { Grid, WinSequences } from "./GameLogic"

const GRID_PADDING = 5

const useStyles = createUseStyles({
	gridWrapper: {
		borderRadius: GRID_PADDING,
		boxShadow: "0px 2px 2px #0006",
	},

	grid: {
		width: 350,
		display: "flex",
		margin: `0 ${GRID_PADDING}px`,
		position: "relative",
		zIndex: 0,

		"&:before, &:after": {
			width: GRID_PADDING,
			backgroundColor: "var(--tiffany)",
			content: '" "',
			display: "block",
			top: 0,
			bottom: 0,
			position: "absolute",
		},

		"&:before": {
			left: -GRID_PADDING,
			borderRadius: `${GRID_PADDING}px 0 0 ${GRID_PADDING}px`,
		},

		"&:after": {
			right: -GRID_PADDING,
			borderRadius: `0 ${GRID_PADDING}px ${GRID_PADDING}px 0`,
		},
	},

	column: {
		flex: 1,
		display: "flex",
		flexDirection: "column-reverse",
		cursor: "pointer",
		position: "relative",
		borderTop: `var(--tiffany) ${GRID_PADDING}px solid`,
		borderBottom: `var(--tiffany) ${GRID_PADDING}px solid`,

		"&:hover, &:focus": {
			borderTop: `var(--tiffany-hover) ${GRID_PADDING}px solid`,
			borderBottom: `var(--tiffany-hover) ${GRID_PADDING}px solid`,
		},

		"&:hover $cell, &:focus $cell": {
			background:
				"-webkit-radial-gradient(50% 50%, circle, transparent 57%, var(--tiffany-hover) 57%)",
		},
	},

	cell: {
		// Make cell as wide as column
		width: "100%",
		// Use padding bottom hack to make cell as heigh as it is wide
		height: 0,
		paddingBottom: "100%",
		background:
			"-webkit-radial-gradient(50% 50%, circle, transparent 57%, var(--tiffany) 57%)",
		position: "relative",
	},
})

type GameBoardProps = {
	grid: Grid
	winSequences: WinSequences
	onClick: (x: number) => React.MouseEventHandler<HTMLDivElement>
}

const GameBoard: React.FC<GameBoardProps> = ({
	grid,
	winSequences,
	onClick,
}) => {
	const classes = useStyles()
	return (
		<div className={classes.gridWrapper}>
			{/* <div '!file-loader?name=Screenshot(62).png!../../tmp/Screenshot(62).png'/>  */}

			<div className={classes.grid}>
				{grid.map((column, x) => (
					<div className={classes.column} key={x} onClick={onClick(x)}>
						{column.map((player, y) => (
							<div className={classes.cell} key={y}>
								{player === null ? null : <Token player={player} y={y} />}
							</div>
						))}
						{x === 0
							? winSequences.map(({ origin, length, rotation }) => (
									<WinOutline
										length={length}
										rotation={rotation}
										origin={origin}
										key={`${origin.x}-${origin.y}-${rotation}`}
									/>
							  ))
							: null}
					</div>
				))}
			</div>
		</div>
	)
}

export default GameBoard
