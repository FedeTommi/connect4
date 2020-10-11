import React from "react"
import PropTypes from 'prop-types'
import withStyles from "react-jss"
import classNames from "classnames"

const styles = {
    root: {
        background: "#1D7775",
        borderRadius: 5,
        color: "#eee",
        outline: "none",
        border: "none",
        fontFamily: "'Bubblegum Sans', cursive",
        fontSize: 25,
        padding: "8px 16px",
        display: "block",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        zIndex: 1,
    },
    triangle: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: "absolute",
        zIndex: -1,
        background: "#155755",
        clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
    },
}

class Button extends React.Component {
    render () {
        const { classes, children, className } = this.props

        return <a className={classNames(classes.root, className)}>
            <div className={classes.triangle} />
            {children}
        </a>
    }
    
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Button)