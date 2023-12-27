import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

type BoopProps = {
    x: number,
    y: number,
    rotation: number,
    scale: number,
    timing: number,
    children: React.ReactNode,
}
const Boop = ({
    x = 0,
    y = 0,
    rotation = 0,
    scale = 1,
    timing = 150,
    children,
}: BoopProps) => {

    const [isBooped, setIsBooped] = useState(false)

    const style = useSpring({
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        transform: isBooped
            ? `translate(${x}px, ${y}px)
               rotate(${rotation}deg)
               scale(${scale})`
            : `translate(0px, 0px)
               rotate(0deg)
               scale(1)`,
        config: {
            tension: 200,
            friction: 5,
        },
    })

    useEffect(() => {
        if (!isBooped) return

        const timeoutId = setTimeout(() => {
            setIsBooped(false)
        }, timing)

        return () => clearTimeout(timeoutId)
    }, [isBooped, timing])

    const trigger = () => setIsBooped(true)

    return (
        <animated.span onMouseEnter={trigger} style={style}>
            {children}
        </animated.span>
    )
}

Boop.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    rotation: PropTypes.number,
    scale: PropTypes.number,
    timing: PropTypes.number,
    children: PropTypes.node.isRequired,
}

export default Boop