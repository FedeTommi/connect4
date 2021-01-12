import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    root: {
        background: 'grey', //#fea #E7B55F #c87137
        borderRadius: 5,
        color: '#eee',
        outline: 'none',
        border: 'none',
        fontFamily: '"Bubblegum Sans", cursive',
        textDecoration: 'none',
        fontSize: 26,
        padding: '12px 20px',
        display: 'block',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        zIndex: 1,
        transition: 'transform 0.25s ease-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
        '&:focus': {
            textDecoration: 'underline',
        }
    },
    triangle: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        zIndex: -1,
        background: '#a3a3a3', //#E7B55F #c87137 #A05A2C
        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
    },
})

const Radiobutton = ({ classes: givenClasses = {}, children, className, ...rest }) => {
    const classes = useStyles()

    return <label className={classNames(classes.root, className)} {...rest}>
        <input type='radio' />
        <div className={classNames(classes.triangle, givenClasses.triangle)} />
        {children}
    </label>
}

Radiobutton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default Radiobutton