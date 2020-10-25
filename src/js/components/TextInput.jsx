import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'


//https://medium.com/@willhowardgb/building-a-beautiful-text-input-component-in-react-f85564cc7e86

const INPUT_HEIGHT = 30
const LABEL_HEIGHT = 15

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column-reverse',
        width: '100%',
        padding: '2px 10px',
        borderRadius: 5,
        position: 'relative',
        backgroundColor: 'rgba(255,255,255,0.4)',
        transition: '0.3s all',
        //transition: '0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out'
        boxShadow: '2px 2px 4px grey',
        marginBottom: 20,
        marginTop: 20,
        cursor: 'text',
        
        '&:hover': {
            backgroundColor: 'white',
        },   
    },

    input: {
        width: '100%',
        height: INPUT_HEIGHT,
        background: 'transparent',
        overflow: 'hidden',
        border: 0,
        outline: 0,
        opacity: 0,
        color: '#555',
        // textAlign: 'center',
        fontSize: `${INPUT_HEIGHT * 3 / 4}`,
        transform: `translateY(-${LABEL_HEIGHT / 2}px)`,
        '&, & + $labelText': {
            fontFamily: '"Bubblegum Sans", cursive',
            transition: 'transform .1s ease-in-out, opacity .1s ease-in-out, color .1s ease-in-out',
        },
        '&:focus, &:not(:placeholder-shown)': {
            '&, & + $labelText': {
                transform: 'translateY(0) scale(1)',
                opacity: 1,
            },
            '& + $labelText': {
                color: 'var(--tiffany-extra-dark)',
            },
        },
        // https://medium.com/@TusharKanjariya/input-floating-labels-using-only-pure-css-80d5f99831e3
        // https://css-tricks.com/float-labels-css/
    },

    labelText: {
        display: 'block',
        color: '#C3C1C1',
        fontSize: LABEL_HEIGHT,
        lineHeight: `${LABEL_HEIGHT}px`,
        transformOrigin: 'left',
        transform: `translateY(${(INPUT_HEIGHT) / 2}px) scale(${INPUT_HEIGHT / LABEL_HEIGHT})`,
    },
 }

 class TextInput extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const value = event.target.value
        this.props.onChange(value)
    }

    render() {
        const { classes, value, error, label, className, onChange, ...rest } = this.props

        // Remove unused variable warning
        // Taken out of props to remove it from `rest`
        onChange
        
        return (
            <label className={classNames(classes.wrapper, className)}>
                <input className={classes.input}
                    type="text"
                    value={value}
                    onChange={this.handleChange}
                    {...rest}
                />
                <span className={classes.labelText}>{label}</span>
            </label>
        )
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
} 

export default withStyles(styles)(TextInput)