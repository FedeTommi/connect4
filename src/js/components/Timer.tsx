import React from "react"
import withStyles from "react-jss"

import Hourglass from "../../svg/hourglass.svg"

const INITIAL_TIMER = 30

const styles = {
	hourglass: {
		height: 50,
	},
	root: {
		fontFamily: '"Bubblegum Sans", cursive',
		fontSize: 20,
		color: "black",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: 75,
	},
	secondsLeft: {
		width: 35,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
}

type TimerProps = {
	classes: Record<string, string>
	isPaused: boolean
	onTimeOut: () => any
	turnCounter: number
}

type TimerState = {
	seconds: number
}

class Timer extends React.Component<TimerProps, TimerState> {
	intervalHandle: ReturnType<typeof setInterval> | null = null
	state = { seconds: INITIAL_TIMER }

	componentDidMount() {
		this.intervalHandle = setInterval(() => {
			const { seconds } = this.state
			if (seconds === 0) {
				this.setState({ seconds: INITIAL_TIMER })
				this.props.onTimeOut()
				return
			}
			if (this.props.isPaused === true) {
				return
			}

			this.setState({ seconds: seconds - 1 })
		}, 1000)
	}

	componentDidUpdate(prevProps: TimerProps) {
		if (this.props.turnCounter !== prevProps.turnCounter) {
			this.setState({ seconds: INITIAL_TIMER })
		}
	}

	componentWillUnmount() {
		clearInterval(this.intervalHandle!)
	}

	render() {
		const { classes } = this.props
		const { seconds } = this.state

		return (
			<div className={classes.root}>
				<Hourglass className={classes.hourglass} />
				<div className={classes.secondsLeft}>
					<div>{seconds}</div>
					<div>s</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Timer)
