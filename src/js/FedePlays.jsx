import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

import FedeDrawing from '../svg/fede_drawing_.svg'

const styles = {
    background: {
        height: '100%',
        width: '100%',
        display: 'flex',
        // flexDirection: 'column',   
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    drawing: {
        height: '100%',
        width: 'auto',
        // paddingLeft: 20,
        paddingTop: 20,
        // paddingBottom: 20,
    }
}

class FedePlays extends React.Component {
    render() {
        const { classes } = this.props

        return <div className={classes.background}>
            <FedeDrawing className={classes.drawing}/>
        </div>

    }
}

FedePlays.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FedePlays)