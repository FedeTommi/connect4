import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

import Game from './Game'
import Button from './components/Button'
import Hourglass from '../svg/hourglass.svg'
import Logo from '../svg/logo.svg'

const styles = {
    background: {
        background: '#EEEEEE',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',   
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: 360,
        justifyContent: 'center',
        display:'inline-block',
        background: 'pink',
    },
    logo: {
        boxSizing: 'border-box',
        width: '100%',
        marginTop: 20,
        marginBottom: 15,
    },
    button: {
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 20,
        fontWeight: 'bold',
        fontSize: 35,
    },
    turnField: {
        background: 'white',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        // boxShadow: '2px 2px 4px grey',
        boxShadow: '0px 1px 2px #0006',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& > span': {
            fontFamily: 'Bubblegum Sans, cursive',
            fontSize: 30,
            /* font-weight: 400, */
            margin: 10,
            textShadow: '0px 1px 2px #0009', 
        },
    },
    player1: {
        color: 'var(--p1-color)',
    },
    player2: {
        color: 'var(--p2-color)',
    },
    hourglass: {
        height: 50,
    },
    
    // .turn-indicator-token {
    //     padding: 10px;
    //     border-radius: 50%;
    //     color: white;
    //     font-family: Roboto;
    //     font-weight: 500;
    // }
}


class GamePage extends React.Component {
    render() { 
        const { classes } = this.props

        return (
            <div className={classes.background}>
                <Button
                    className={classes.button}
                >
                    | |
                </Button>
                <div className={classes.wrapper}>
                    <Logo className={classes.logo} />
                    <Game />
                    <div className={classes.turnField}>
                        <span className={classes.player1}>
                            Federica
                        </span>
                        <Hourglass className={classes.hourglass} />
                        <span className={classes.player2}>
                            Marcel
                        </span>
                    </div>  
                </div>
            </div>
        )
    }
}

GamePage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default  withStyles(styles)(GamePage)