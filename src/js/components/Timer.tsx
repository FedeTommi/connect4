import React, { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import { createUseStyles } from "react-jss"

import Hourglass from "../../svg/hourglass.svg"
import usePrevious from "../hooks/usePrevious"

const INITIAL_TIMER = 30

const useStyles = createUseStyles({
	hourglass: {
		height: 50,
		animationName: "$hourglass-rotation",
		animationDuration: "30s",
		animationIterationCount: "infinite",
		// "& #top-sand g path": {
		// 	animationName: "$top-clip",
		// 	animationDuration: "30s",
		// 	animationIterationCount: "infinite",
		// },
		// "& #bottom-sand g path": {
		// 	animationName: "$bottom-clip",
		// 	animationDuration: "30s",
		// 	animationIterationCount: "infinite",
		// },
	},

	"@keyframes top-clip": {
		"0%": {},
		"90%": { transform: "translateY(15px)" },
		"100%": { transform: "translateY(46px)" },
	},
	"@keyframes bottom-clip": {
		"0%": {},
		"100%": { transform: "translateY(-30px)" },
	},
	"@keyframes hourglass-rotation": {
		"50%": { transform: "rotateZ(0)" },
		"99%": { transform: "rotateZ(0)" },
		"99.5%": { transform: "scale(1.3)" }, //translateX(50%)
		"100%": { transform: "rotateZ(180deg)" },
	},
	root: {
		fontFamily: '"Bubblegum Sans", cursive',
		fontSize: 20,
		color: "black",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: 90,
	},
	secondsLeft: {
		width: 35,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: "auto",
	},
})

type TimerProps = {
	isPaused: boolean
	onTimeOut: () => any
	turnCounter: number
}

const Timer: React.FC<TimerProps> = ({ isPaused, onTimeOut, turnCounter }) => {
	let intervalHandle: ReturnType<typeof setInterval> | null = null
	const prevTurnCounter = usePrevious(turnCounter)
	const classes = useStyles()
	const [seconds, setSeconds] = useState<number>(INITIAL_TIMER)
	const [{ x }, set] = useSpring(() => ({ x: 0 }))

	const style = {
		transform: turnCounter % 2 === 0 ? `rotateZ(0deg)` : `rotate(180deg)`,
		transitionDuration: "1s",
		transitionProperty: "transform",
		config: { tension: 20, friction: 20 },
	}

	const bottomStyle = {
		// transform: turnCounter % 2 === 0 ? `translateY(0px)` : "translateY(-30px)",
		// transitionDuration: "1s",
		// transitionProperty: "transform",
		// config: { tension: 20, friction: 20 },
	}
	const topStyle = {
		transform: turnCounter % 2 === 0 ? `rotate(0)` : "rotate(180deg)",
		transformOrigin: "center",
		transitionDuration: "1s",
		transitionProperty: "transform",
		config: { tension: 20, friction: 20 },
	}

	useEffect(() => {
		if (turnCounter !== prevTurnCounter) {
			setSeconds(INITIAL_TIMER)
		}

		intervalHandle = setInterval(async () => {
			if (seconds === 0) {
				setSeconds(INITIAL_TIMER)
				onTimeOut()
				return
			}
			if (isPaused === true) {
				return
			}

			setSeconds(seconds - 1)
		}, 1000)

		return () => {
			clearInterval(intervalHandle!)
		}
	}, [turnCounter, seconds, isPaused])

	return (
		<div className={classes.root}>
			<animated.span
				style={style}
				onAnimationStart={() => seconds === INITIAL_TIMER} //turnCounter !== prevTurnCounter}
			>
				{/* <Hourglass className={classes.hourglass} /> */}
				<svg
					version="1.1"
					id="hourglass"
					x="0px"
					y="0px"
					viewBox="0 0 84.1 106.5"
					height="47px"
					enableBackground="new 0 0 84.1 106.5"
				>
					<path
						id="glass"
						fill="#CCF8FF"
						d="M74.4,79.1c0-10.3-7.2-19.2-17.8-23.5c-2.7-1.1-2.7-4.2,0-5.3C67.2,46,74.4,37.1,74.4,26.8V11H9.7v15.8c0,10.3,7.2,19.2,17.8,23.5c2.7,1.1,2.7,4.2,0,5.3C17,60,9.7,68.8,9.7,79.1v16.4h64.7L74.4,79.1L74.4,79.1z"
					/>
					<path
						id="bottom-plate"
						fill="#DD9F80"
						d="M75.4,11h-67c-4.7,0-8.5-2.5-8.5-5.5S3.7,0,8.4,0h67.1C80.2,0,84,2.5,84,5.5C83.9,8.5,80.1,11,75.4,11z"
					/>
					<path
						id="top-plate"
						fill="#DD9F80"
						d="M75.4,95.5h-67c-4.7,0-8.5,2.5-8.5,5.5s3.8,5.5,8.5,5.5h67.1c4.7,0,8.5-2.5,8.5-5.5C83.9,98,80.1,95.5,75.4,95.5z"
					/>
					<g id="bottom-sand">
						<clipPath id="SVGID_00000062900714672112152060000003209405532830297217_">
							<rect id="SVGID_1_" x="-0.1" y="52.3" width="83.9" height="40" />
						</clipPath>
						<g clipPath="url(#SVGID_00000062900714672112152060000003209405532830297217_)">
							<animated.path
								style={bottomStyle}
								fill="#EFD4BF"
								d="M13.8,123.2V117c8.9-7.3,15.9-13.9,20.8-19.6l0.2-0.2c2.5-3,4.7-4.4,7-4.4c3.2,0,5.7,2.8,7,4.3l0.1,0.1l0.3,0.3c5.1,5.9,11.9,12.5,20.6,19.9v5.9H13.8z"
							/>
						</g>
					</g>
					<g id="top-sand">
						<clipPath id="SVGID_00000075874261675083374320000014012175088842450862_">
							<path
								id="SVGID_00000101079927897190841180000017366869627532568713_"
								d="M42.7,22.8C37.4,20.9,31.8,20,25.9,20c-3.9,0-7.8,0.4-11.7,1.3c-0.1,0-0.1,0-0.2,0v3.1c0,8.1,4.3,15.4,11,20c2.7,1.9,5.8,3.3,9.2,4.2c0,0,0,0,0,0c0.2,0.1,0.6,0.2,1,0.3c2.4,0.7,3.1,0.8,4.1,1.4c0.4,0.2,0.6,0.4,0.8,0.6c0.8,0.9,1,2,1.1,3.1v41.5h0h1.5H43V54c0.1-1.1,0.3-2.2,1.1-3.1c0.2-0.3,0.5-0.4,0.8-0.6c1-0.6,1.7-0.8,4.1-1.4c0.4-0.1,0.8-0.2,1-0.3c0,0-0.1,0-0.1,0c3.4-0.9,6.6-2.4,9.3-4.3c5.9-4.1,9.9-10.2,10.7-17.2C64.6,26.8,51,25.7,42.7,22.8z"
							/>
						</clipPath>
						<g clipPath="url(#SVGID_00000075874261675083374320000014012175088842450862_)">
							<animated.path
								style={topStyle}
								fill="#EFD4BF"
								d="M42.7,22.8C37.4,20.9,31.8,20,25.9,20c-3.9,0-7.8,0.4-11.7,1.3c-0.1,0-0.1,0-0.2,0v3.1c0,8.1,4.3,15.4,11,20c4.7,3.3,10.7,5.2,17.1,5.2c6.5,0,12.5-2,17.2-5.3c5.9-4.1,9.9-10.2,10.7-17.2C64.6,26.8,51,25.7,42.7,22.8z"
							/>
						</g>
					</g>
					<path
						id="shadow"
						opacity="0.3"
						fill="#49AFBF"
						d="M34,11c-4.7,0-8.5-2.5-8.5-5.5S29.3,0,34,0H8.3C3.6,0-0.2,2.5-0.2,5.5S3.6,11,8.3,11h1.2v15.8c0,10.3,7.2,19.2,17.8,23.5c0.3,0.1,0.6,0.3,0.9,0.5c0.6,0.5,0.9,1,1.1,1.7v0.1c0.2,1.2-0.5,2.4-2,3C16.7,60,9.4,68.8,9.4,79.1v16.4H8.3c-4.7,0-8.5,2.5-8.5,5.5s3.8,5.5,8.5,5.5H34c-4.7,0-8.5-2.5-8.5-5.5s3.8-5.5,8.5-5.5h-9.2c-2.3-10.4-2.1-20.9,4.6-28.2C38.7,57,38.1,46,35.3,37.5c-2.3-6.8,3-13.8,11.2-14.7c18.8-2.2,27.8-8.9,27.8-8.9V11H34z"
					/>
				</svg>
			</animated.span>
			<div className={classes.secondsLeft}>
				<div>{seconds}</div>
				<div>s</div>
			</div>
		</div>
	)
}

export default Timer
