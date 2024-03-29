import React, { ReactNode } from "react"
import { useSpring, animated } from "react-spring"
// UPDATE this path to your copy of the hook!
// Source here: https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion

type BoopConfig = {
	x?: number
	y?: number
	rotation?: number
	scale?: number
	timing?: number
	springConfig?: {
		tension?: number
		friction?: number
	}
	delay?: number
}

export function useBoop({
	x = 0,
	y = 0,
	rotation = 0,
	scale = 1,
	timing = 150,
	springConfig = {
		tension: 300,
		friction: 10,
	},
	delay = 0,
}: BoopConfig) {
	// const prefersReducedMotion = usePrefersReducedMotion()
	const [isBooped, setIsBooped] = React.useState(false)
	const style = useSpring({
		from: {
			transform: isBooped
				? `translate(0px, 0px)
			rotate(0deg)
			scale(1)`
				: `translate(${x}px, ${y}px)
			rotate(${rotation}deg)
			scale(${scale})`,
		},
		to: {
			transform: isBooped
				? `translate(${x}px, ${y}px)
			rotate(${rotation}deg)
			scale(${scale})`
				: `translate(0px, 0px)
			rotate(0deg)
			scale(1)`,
		},
		config: springConfig,
		delay: delay,
	})
	React.useEffect(() => {
		if (!isBooped) {
			return
		}
		const timeoutId = window.setTimeout(() => {
			setIsBooped(false)
		}, timing)
		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [isBooped])
	const trigger = React.useCallback(() => {
		setIsBooped(true)
	}, [])
	// let appliedStyle = prefersReducedMotion ? {} : style
	let appliedStyle = style
	return { style: appliedStyle, trigger }
}

type BoopProps = BoopConfig & {
	children: ReactNode
}

const Boop: React.FC<BoopProps> = ({ children, ...boopConfig }) => {
	const { style, trigger } = useBoop(boopConfig)

	return (
		<animated.span onMouseEnter={trigger} style={style}>
			{children}
		</animated.span>
	)
}
export default Boop
